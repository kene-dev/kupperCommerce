import React from 'react'
import logo from '../assets/koopLogo.png'

function About() {
    return (
        <div className='w-full max-w-4xl mx-auto flex flex-col justify-center items-center px-8 py-10 md:px-14 md:py-14 2xl:px-24 2xl:py-24 gap-8'>
            <h1 className='font-bold text-3xl md:text-4xl text-center text-primary'>Our Story — Why We Started Kupper Prime</h1>

            <img src={logo} alt="Kupper Prime Logo" className='my-4 w-48' />

            <div className='flex flex-col gap-6 text-center md:text-left'>
                <p className='text-lg leading-relaxed'>
                    Kupper Prime started from a simple belief — <strong>every home cook deserves access to the world's finest spices without breaking the bank</strong>.
                </p>

                <p className='text-base leading-relaxed'>
                    We noticed how food enthusiasts admired premium spices from afar — saffron, cardamom, exotic blends — always thinking, "Maybe someday."
                </p>

                <p className='text-base leading-relaxed'>
                    But we realized something important — the high prices weren't always about the spices themselves, but about middlemen, fancy packaging, and unnecessary markups.
                </p>

                <p className='text-lg font-semibold text-primary my-2'>
                    So we asked ourselves a question:
                </p>

                <p className='text-xl font-bold text-primary italic'>
                    What if we sourced directly and passed the savings to our customers?
                </p>

                <p className='text-base leading-relaxed'>
                    That's how Kupper Prime was born — to bring authentic, premium-quality spices from their origins straight to your kitchen, at prices that make sense.
                </p>

                <p className='text-base leading-relaxed'>
                    Every spice we sell is 100% pure, carefully sourced from trusted farms and suppliers around the world. We don't sell fillers, blends with additives, or low-quality substitutes — we're here to ensure that the flavors you love are always within reach.
                </p>

                <p className='text-lg font-semibold my-4'>
                    For us, it's more than just spices.
                </p>

                <p className='text-base leading-relaxed'>
                    It's about <strong className='text-primary'>authentic flavors made accessible</strong>, <strong className='text-primary'>quality made affordable</strong>, and <strong className='text-primary'>culinary adventures made possible</strong>.
                </p>

                <div className='text-2xl font-bold text-primary text-center mt-8 py-6 border-t-2 border-primary/30'>
                    Kupper Prime — Premium Spices, Authentic Flavors
                </div>
            </div>
        </div>
    )
}

export default About