/* eslint-disable no-unused-vars */
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../features/Pastes/pastesSlice";

const Home = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pasteID = searchParams.get('pasteID');
    let allPastes = useSelector((state) => state.paste.value);
    const div = useRef()

    const dispatch = useDispatch()

    const [title, setTitle] = useState(() => {
        if (allPastes) {
            const filteredPaste = allPastes.find(p => p.Id === pasteID);
            return filteredPaste ? filteredPaste.Title : '';
        }
        return '';
    });
    const [paste, setPaste] = useState(() => {
        if (allPastes) {
            const filteredPaste = allPastes.find(p => p.Id === pasteID);
            return filteredPaste ? filteredPaste.Paste : '';
        }
        return '';
    });



    useGSAP(() => {
        gsap.from('.div *', {
            opacity: 0,
            duration: .5,
            stagger: .1
        })
    });

    function addPaste() {
        const newId = pasteID || Date.now().toString();

        const pasteObject = {
            Id: newId,
            Title: title,
            Paste: paste,
        };

        console.log(pasteID);


        // ... rest of your function (e.g., adding to a list, API call)
        if (pasteID == null) {
            dispatch(addToPaste(pasteObject))
            console.log("added");
        }
        else {
            dispatch(updateToPaste(pasteObject))
            console.log("updated");
        }

        setTitle('')
        setPaste('')
    }






    return (
        <div className="w-full h-[calc(100vh-80px)] min-h-screen px-4 sm:px-8 md:px-20 lg:px-50 pt-12 flex flex-col gap-10 div">
            <h1 className="text-3xl sm:text-4xl font-['Advent_Pro'] font-thin tracking-wide">
                {pasteID ? "Edit Paste" : "Add Paste"}
            </h1>

            <div className="w-full h-full mb-10 py-5 flex flex-col gap-5 text-lg sm:text-xl text-white">
                <input
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); }}
                    type="text"
                    placeholder="Paste Title"
                    className="w-full p-4 sm:p-5 bg-white/10 border-3 outline-0 border-white/50 focus:border-white rounded-2xl"
                    inputMode="text"
                    autoComplete="off"
                    onFocus={(e) => {
                        setTimeout(() => {
                            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 200);
                    }}
                />

                <textarea
                    value={paste}
                    onChange={(e) => { setPaste(e.target.value); }}
                    placeholder="Type Your Paste......"
                    className="w-full h-[45vh] sm:h-full resize-none p-4 sm:p-5 bg-white/10 border-3 outline-0 border-white/50 focus:border-white rounded-2xl whitespace-pre-wrap"
                    onFocus={(e) => {
                        setTimeout(() => {
                            e.target.scrollIntoView({ behavior: "smooth", block: "center" });
                        }, 200);
                    }}
                ></textarea>

                <button
                    onClick={addPaste}
                    className="p-4 sm:p-5 bg-gray-600 rounded-2xl text-xl sm:text-2xl cursor-pointer active:scale-99 mt-2"
                >
                    {pasteID ? "Edit Paste" : "Add Paste"}
                </button>
            </div>
        </div>

    )
}

export default Home