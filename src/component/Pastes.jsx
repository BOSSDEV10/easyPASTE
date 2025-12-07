/* eslint-disable no-unused-vars */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import pen from '../assets/pen.svg'
import trash from "../assets/trash.svg"
import copy from "../assets/clipboard.svg"
import share from "../assets/share-nodes.svg"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { removeFromPaste } from '../features/Pastes/pastesSlice'


const Pastes = () => {

    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();

    let list = useSelector(state => state.paste.value)
    const filteredList = filter ? list.filter(item =>
        item.Title.toLowerCase().includes(filter.toLowerCase())
    ) : list

    useGSAP(() => {
        gsap.from('.div *', {
            opacity: 0,
            duration: .5,
            stagger: .01
        })
    })


    return (
        <div className="w-full h-[calc(100vh-80px)] px-4 sm:px-8 md:px-20 lg:px-50 pt-12 flex flex-col gap-10">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0">
                <h1 className="text-3xl sm:text-4xl font-['Advent_Pro'] font-thin tracking-wide">
                    All Pastes
                </h1>

                <div className="w-full sm:w-auto flex items-center gap-3">
                    <input
                        className="flex-1 sm:flex-none bg-white/5 w-full sm:w-72 px-3 py-3 focus:border-white/80 text-white outline-0 border-3 border-white/20 rounded-xl"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        onFocus={(e) => {
                            // Better UX on mobile keyboard — scroll input into view
                            setTimeout(() => {
                                e.target.scrollIntoView({ behavior: "smooth", block: "center" });
                            }, 200);
                        }}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search"
                    />

                    <button
                        onClick={async () => {
                            try {
                                if (navigator.share) {
                                    await navigator.share({
                                        title: document.title,
                                        text: 'Check out this page!',
                                        url: window.location.href
                                    });
                                } else {
                                    // Fallback for browsers without Web Share API
                                    if (navigator.clipboard && navigator.clipboard.writeText) {
                                        await navigator.clipboard.writeText(window.location.href);
                                    } else {
                                        const textarea = document.createElement('textarea');
                                        textarea.value = window.location.href;
                                        document.body.appendChild(textarea);
                                        textarea.select();
                                        document.execCommand('copy');
                                        document.body.removeChild(textarea);
                                    }
                                    toast.success('Link copied to clipboard');
                                }
                            } catch (error) {
                                toast.error('Error sharing content:' + error);
                            }
                        }}
                        className="text-2xl h-12 w-12 shrink-0 flex items-center justify-center bg-white rounded-xl cursor-pointer p-3"
                    >
                        <img src={share} alt="" />
                    </button>
                </div>
            </div>

            <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col gap-4 px-1 mb-5">
                {filteredList.length === 0 && (
                    <div className="w-full flex flex-col items-center justify-center text-center mt-20 text-white/60 px-5">
                        <h2 className="text-2xl sm:text-3xl font-light">No Results Found</h2>
                        <p className="text-base sm:text-lg mt-3">
                            {list.length <=0 ? "Thare Is No Paste Available" : "Try searching with another keyword."}
                        </p>
                    </div>
                )}

                {filteredList.map((item) => (
                    <div
                        key={item.Id}
                        className="w-full h-auto rounded-2xl bg-white/5 backdrop-blur-md border-3 border-white/30 p-5 relative flex flex-col gap-3"
                    >
                        <div className="absolute top-4 right-4 flex gap-2">
                            <NavLink
                                to={`/?pasteID=${item.Id}`}
                                className="text-2xl h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-white rounded-xl cursor-pointer p-2 sm:p-3"
                            >
                                <img src={pen} alt="" />
                            </NavLink>

                            <button
                                onClick={() => {
                                    dispatch(removeFromPaste(item.Id));
                                }}
                                className="text-2xl h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-white rounded-xl cursor-pointer p-2 sm:p-3"
                            >
                                <img src={trash} alt="" />
                            </button>

                            <button
                                onClick={async () => {
                                    try {
                                        if (navigator.clipboard && navigator.clipboard.writeText) {
                                            await navigator.clipboard.writeText(item.Paste);
                                        } else {
                                            const textarea = document.createElement('textarea');
                                            textarea.value = item.Paste;
                                            document.body.appendChild(textarea);
                                            textarea.select();
                                            document.execCommand('copy');
                                            document.body.removeChild(textarea);
                                        }
                                        toast.success('Copied To Clipboard');
                                    } catch (error) {
                                        toast.error('Error :- ' + error);
                                    }
                                }}
                                className="text-2xl h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center bg-white rounded-xl cursor-pointer p-2 sm:p-3"
                            >
                                <img src={copy} alt="" />
                            </button>
                        </div>

                        <div className="w-full flex items-start justify-start text-2xl sm:text-3xl px-3 sm:px-5 whitespace-pre-wrap wrap-break-word">
                            <h1>{item.Title}</h1>
                        </div>

                        <div className="w-full h-auto px-3 sm:px-5 pt-3 text-sm sm:text-lg font-['Poppins'] text-white/80 whitespace-pre-wrap wrap-break-word">
                            {item.Paste}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pastes