import React, { useState } from 'react'

export default function TopPageInfo() {

    const [checkedFails, setCheckedFails] = useState([false, false, false]);
    const [checkedSuccess, setCheckedSuccess] = useState([false, false, false]);


    function toggleFail(index: number) {
        setCheckedFails((prev) => {
            const newArr = [...prev];
            newArr[index] = !newArr[index];
            return newArr;
        });
    }

    function toggleSuccess(index: number) {
        setCheckedSuccess((prev) => {
            const newArr = [...prev];
            newArr[index] = !newArr[index];
            return newArr;
        });
    }

    return (
        <div className="grid border bg-secondary/20 rounded-b-2xl grid-cols-5">
            {/*Left Side*/}
            <div className="w-full col-span-2 self-center">
                <div className="grid grid-cols-2 gap-4 p-2 ">
                    <label className="floating-label col-span-2">
                        <span>Character Name</span>
                        <input type="text" placeholder="Character Name" className="input input-md w-full" />
                    </label>
                    <label className="floating-label col-span-1">
                        <span>Background</span>
                        <input type="text" placeholder="Background" className="input input-md" />
                    </label>
                    <label className="floating-label col-span-1">
                        <span>Class</span>
                        <input type="text" placeholder="Class" className="input input-md" />
                    </label>
                    <label className="floating-label col-span-1">
                        <span>Species</span>
                        <input type="text" placeholder="Species" className="input input-md" />
                    </label>
                    <label className="floating-label col-span-1">
                        <span>Sub Class</span>
                        <input type="text" placeholder="Sub Class" className="input input-md" />
                    </label>
                </div>
            </div>

            {/*Middle*/}
            <div className="w-full col-span-1 self-center ">

                <div className="flex flex-col justify-around items-center p-2 self-center mx-2 gap-4 ">
                    <label className="floating-label">
                        <span>Level</span>
                        <input type="text" placeholder="Level" className="input input-md" />
                    </label>
                    <label className="floating-label">
                        <span>Experience</span>
                        <input type="text" placeholder="XP" className="input input-md" />
                    </label>
                </div>
            </div>


            {/*Right Side*/}
            <div className="w-full col-span-2 self-center">
                <div className="grid grid-cols-3 border rounded-br-2xl text-center justify-items-center ">
                    <div className="border-r col-span-1 w-full p-1">
                        <h3>Hit Points</h3>

                        <div className="flex flex-col justify-around gap-2 m-2">
                            <label className="floating-label">
                                <span>Current</span>
                                <input type="text" placeholder="Current" className="input input-md" />
                            </label>

                            <label className="floating-label">
                                <span>Temp</span>
                                <input type="text" placeholder="Temp" className="input input-md" />
                            </label>

                            <label className="floating-label">
                                <span>Max</span>
                                <input type="text" placeholder="Max" className="input input-md" />
                            </label>
                        </div>
                    </div>

                    <div className="col-span-1 w-full flex flex-col p-2">
                        <h3>Hit Dice</h3>
                        <div className="flex flex-col justify-center gap-3 flex-grow w-fit mx-auto">
                            <label className="floating-label">
                                <span>Spent</span>
                                <input type="text" placeholder="Spent" className="input input-md" />
                            </label>

                            <label className="floating-label">
                                <span>Max</span>
                                <input type="text" placeholder="Max" className="input input-md" />
                            </label>
                        </div>
                    </div>


                    <div className="border-l rounded-br-2xl p-2 col-span-1 flex flex-col w-full">
                        <h3>Death Saves</h3>

                        {/*Fails*/}
                        <div className="flex flex-col justify-center gap-6 flex-grow w-fit mx-auto">

                            <div>
                                <label className="label text-sm text-error underline">Fails</label><br />
                                {checkedFails.map((checked, i) => (
                                    <input
                                        key={i}
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleFail(i)}
                                        className="mx-1 checkbox border-primary border-2 bg-current checked:border-error checked:bg-red-400 checked:text-red-800"
                                    />
                                ))}
                            </div>
                            {/*Save*/}
                            <div>
                                <label className="label text-sm text-success underline">Success</label><br />
                                {checkedSuccess.map((checked, i) => (
                                    <input
                                        key={i}
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleSuccess(i)}
                                        className="mx-1 checkbox border-primary border-2 bg-current checked:border-success checked:bg-green-400 checked:text-green-800"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
