import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { AiOutlineUser } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router';

import UserInformationDropDown from '../components/UserInformationDropDown.jsx';
import AuthModel from '../models/auth/AuthModel.jsx';
import Skeleton from '../components/Skeleton.jsx';
import PromptBox from '../components/PromptBox.jsx';
import ImagePreview from '../components/PreviewImage.jsx';
import Message from '../components/Message.jsx';
import Response from '../components/Response.jsx';
import PromptHistory from '../components/PromptHistory.jsx';

import './style.css';

const { v4: uuidv4 } = require('uuid');

const MainScreen = () => {

    const chatRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));

    const [prompt, setPrompt] = useState('');
    const [numberOfImages, setNumberOfImages] = useState(1);
    const [resolution, setResolution] = useState('1024x1024');
    const [imageEngine, setImageEngine] = useState('Flux-1');
    const [imgIsOpen, setImgIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [messages, setMessages] = useState([]);
    const [isStarting, setIsStarting] = useState(false);
    const [authModelIsOpen, setAuthModelIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [prompts, setPrompts] = useState([]);
    const [promptIsLoading, setPromptsIsLoading] = useState(true);

    const isOnline = navigator.onLine;
    if (!isOnline) navigate('/network-status/offline');

    const fetchPrompts = async () => {

        console.log('[ 48:MainScreen ] prompts is loading...')

        await axios.get(`http://localhost:5000/api/v1/get-prompts/${user.id}`)
            .then(response => {
                if (response.data.prompts) {
                    setPromptsIsLoading(false);
                    setPrompts(response.data.prompts);
                }
            })
            .catch(error => { console.warn(error); })
    }

    const handleDownload = (src) => {
        const link = document.createElement('a');
        link.href = src;
        const timestamp = new Date().getTime();
        link.download = `image_${timestamp}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, prompt, numberOfImages, resolution]);

    async function fetchConversation(id) {

        console.log(`[ 48:MainScreen ] fetching conversation for id: ${id}`);

        try {
            const res = await axios.get(`http://localhost:5000/api/v1/get-conversation/${id}/${user.id}`);
            const conversations = res.data.conversations;

            if (conversations) {

                const allMessages = [];

                for (const convo of conversations) {

                    allMessages.push({
                        id: `user-${convo._id}`,
                        type: 'user',
                        text: convo.prompt,
                        time: new Date(convo.createdAt),
                    });

                    if (convo.images?.length) {
                        allMessages.push({
                            id: `loading-${convo._id}`,
                            type: 'loading',
                            count: convo.images.length,
                            time: new Date(convo.createdAt)
                        });
                    }
                }

                setMessages(allMessages);

                for (const convo of conversations) {
                    if (convo.images?.length) {
                        await new Promise(resolve => setTimeout(resolve, 500));

                        setMessages(prev => prev.map(msg =>
                            msg.id === `loading-${convo._id}`
                                ? { id: `bot-${convo._id}`, type: 'bot', images: convo.images, time: new Date(convo.createdAt) }
                                : msg
                        ));
                    }
                }
            }

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {

        if (!id || !user) {
            navigate('/c');
        }

        if (user) {
            fetchConversation(id);
            fetchPrompts();
        }

    }, []);

    const handleImageOpen = (src) => {
        setImgIsOpen(!imgIsOpen);
        setSelectedImage(src);
    };

    const handleSend = async (e) => {

        if (!localStorage.getItem('user')) {
            setAuthModelIsOpen(true);
            return;
        }

        if (!prompt) return;

        let uniqueId;

        if (!id) {
            uniqueId = uuidv4();
            navigate(`/c/${uniqueId}`)
        } else {
            uniqueId = id;
        }

        const userMessage = { type: 'user', text: prompt, time: new Date() };
        const loadingMessage = { type: 'loading', count: numberOfImages, time: new Date() };

        const chatId = uuidv4().split('-')[0];

        await axios.post('http://localhost:5000/api/v1/save-conversation', {
            conversationId: uniqueId,
            chatId,
            userId: JSON.parse(localStorage.getItem('user')).id,
            userMessage: userMessage.text,
            imagesNeeded: numberOfImages,
            resolution,
            imageEngine,
        }).catch(error => console.warn(error));

        setIsStarting(true);

        setMessages(prev => [...prev, userMessage, loadingMessage]);

        const textarea = document.querySelector('.text-field');
        if (textarea) {
            textarea.style.height = 'auto';
        }

        try {

            const response = await axios.post('http://localhost:5000/api/v1/generate-image', {
                prompt,
                count: numberOfImages,
                resolution,
            });

            if (response.data.success) {

                const images = response.data.images || [];
                setIsStarting(false);
                fetchPrompts();
                setPrompt('');

                await axios.post('http://localhost:5000/api/v1/save-conversation-image', {
                    conversationId: uniqueId,
                    chatId,
                    images: images,
                })
                    .catch(error => console.warn(error));

                setMessages(prev => {
                    const updated = [...prev];
                    updated.pop();
                    return [...updated, { type: 'bot', images, time: new Date() }];
                });
            }
        } catch (error) {
            console.error('Error generating image:', error);
            setMessages(prev => {
                const updated = [...prev];
                updated.pop();
                return updated;
            });
        }
    };


    return (
        <div className='main' >

            <div className="left">
                <PromptHistory
                    promptList={prompts}
                    loading={promptIsLoading}
                    fetchConversation={fetchConversation}
                />
            </div>

            <div className="right">

                {messages.length > 0 && (

                    <div className='chat-section' ref={chatRef} onClick={() => { setShowDropdown(false) }}>

                        {messages?.map((message, index) => (

                            <div key={index} className='role'>

                                {message.type === 'loading' && <Skeleton message={message} />}

                                {message.type === 'user' && <Message message={message} />}

                                {message.type === 'bot' && message.images &&
                                    <Response
                                        message={message}
                                        handleImageOpen={handleImageOpen}
                                        handleDownload={handleDownload}
                                    />
                                }

                            </div>

                        ))}

                    </div>
                )}


                <div className='middle-content' onClick={() => setShowDropdown(false)}>

                    {messages.length === 0 && (
                        <div className='header'>
                            {user && <h3 className='inter-regular welcome-text'>Welcome back, @{user.username}</h3>}
                            <h1 className='inter-semibold text'>Ready to bring your imagination to life?</h1>
                        </div>
                    )}

                    <ImagePreview
                        handleDownload={handleDownload}
                        handleImageOpen={handleImageOpen}
                        imgIsOpen={imgIsOpen}
                        selectedImage={selectedImage}
                    />

                    <PromptBox
                        setPrompt={setPrompt}
                        handleSend={handleSend}
                        imageEngine={imageEngine}
                        isStarting={isStarting}
                        numberOfImages={numberOfImages}
                        prompt={prompt}
                        resolution={resolution}
                        setImageEngine={setImageEngine}
                        setNumberOfImages={setNumberOfImages}
                        setResolution={setResolution}
                    />

                </div>
            </div>


            {
                user ?

                    <button className='user-btn group' onClick={() => setShowDropdown(!showDropdown)}>
                        <AiOutlineUser className='text-white text-xl relative' />
                        <UserInformationDropDown setShowDropdown={setShowDropdown} showDropdown={showDropdown} />
                    </button>

                    : <button className='donate-btn inter-regular' onClick={() => setAuthModelIsOpen(true)}>Register</button>
            }

            {authModelIsOpen && <AuthModel setAuthModelIsOpen={setAuthModelIsOpen} />}

        </div>

    );
}

export default MainScreen;