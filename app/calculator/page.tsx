"use client";
import React from "react";

interface ButtonProps {
    children: React.ReactNode;
}

const Calculator = () => {
    const [value, setValue] = React.useState<string>("");

    const Button: React.FC<ButtonProps> = ({children}) => {
        return (
            <button
                className="cursor-pointer h-[60px] w-[60px] border text-xl rounded-full bg-green-50 shadow-xl"
                onClick={() => setValue(value + children)}
            >
                {children}
            </button>
        );
    };
    const evaluate = (e: React.FormEvent) => {
        e.preventDefault();
        setValue(eval(value));
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[400px] border rounded-2xl bg-gray-50 shadow-xl p-[45px] scale-[0.6]">
                <div className="input h-[100px] w-full rounded-2xl bg-green-50 border p-[0px,30px]">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="text-3xl overflow-hidden flex items-center w-full h-full border-none outline-none p-3"
                    />
                </div>
                <div style={{paddingTop: 40}}>
                    <div className="pt-[30px] flex justify-between">
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>+</Button>
                    </div>
                    <div className="pt-[30px] flex justify-between">
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>6</Button>
                        <Button>-</Button>
                    </div>
                    <div className="pt-[30px] flex justify-between">
                        <Button>7</Button>
                        <Button>8</Button>
                        <Button>9</Button>
                        <Button>*</Button>
                    </div>
                    <div className="pt-[30px] flex justify-between">
                        <Button>.</Button>
                        <Button>0</Button>
                        <Button>/</Button>
                        <button
                            className="cursor-pointer h-[60px] w-[60px] border text-xl rounded-full bg-green-50 shadow-xl"
                            onClick={evaluate}
                        >
                            =
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
