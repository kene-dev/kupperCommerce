import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { carouselData } from '@/lib/carouselData'
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Button } from '../ui/button';
import { Link } from 'react-router';
import ad1 from '../../assets/shop-banner.jpg'
import ad2 from '../../assets/ad2.png'
import ad3 from '../../assets/ad3.png'

const Hero = () => {
    const categories = [
        {
            title: "Turmeric & Golden Spices",
            description: "Anti-inflammatory powerhouses",
            image: "https://images.unsplash.com/photo-1698556735172-1b5b3cd9d2ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHBvd2RlciUyMHNwaWNlfGVufDF8fHx8MTc2ODM2NDgwNnww&ixlib=rb-4.1.0&q=80&w=1080",
            color: "from-yellow-500 to-orange-500"
        },
        {
            title: "Cinnamon & Warm Spices",
            description: "Perfect for baking & beverages",
            image: "https://images.unsplash.com/photo-1601379758962-cadba22b1e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5uYW1vbiUyMHN0aWNrc3xlbnwxfHx8fDE3Njg0MTEzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
            color: "from-amber-600 to-red-600"
        },
        {
            title: "Red Peppers & Chilis",
            description: "Add heat to any dish",
            image: "https://images.unsplash.com/photo-1686664790081-c35f7ce799e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXByaWthJTIwcmVkJTIwcGVwcGVyfGVufDF8fHx8MTc2ODQ4OTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
            color: "from-red-500 to-pink-500"
        },
        {
            title: "Fresh Herbs & Greens",
            description: "Organic garden-fresh herbs",
            image: "https://images.unsplash.com/photo-1744659747310-39564f92c25b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaGVyYnMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3Njg0ODkyODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
            color: "from-green-500 to-emerald-600"
        }
    ];

    return (
        <div>
            <Carousel opts={{
                align: "start",
                loop: true,
            }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                    Fade()
                ]} className='w-full mb-10'>
                <CarouselContent>
                    {carouselData.map((item, index) => (
                        <CarouselItem key={index}>
                            <div style={{ backgroundImage: `url(${item.image})` }} className='w-full lg:h-[550px] h-[400px] relative bg-cover bg-no-repeat bg-right lg:bg-center'>

                                {/* Desktop version */}
                                <div className='hidden lg:flex absolute z-10 lg:top-1/4 lg:left-20 inset-0 text-left flex-col lg:items-start items-center justify-center lg:justify-start lg:gap-4 gap-4  lg:backdrop-opacity-0  lg:bg-transparent'>

                                    <h1 className='text-secondary lg:text-4xl text-3xl font-bold lg:text-left text-center drop-shadow-2xl' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{item.title}</h1>

                                    <p className='w-[350px] lg:text-left text-center text-base text-white lg:text-white font-medium' style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>{item.subText}</p>
                                    <Link to="/shop">
                                        <Button className='text-primary bg-gradient-to-r from-secondary to-secondary/90'>
                                            Shop Now
                                        </Button>
                                    </Link>
                                </div>

                                {/* Mobile version */}
                                <div className='lg:hidden absolute z-10 inset-0 flex items-center justify-center'>
                                    <div className='flex flex-col items-center justify-center text-center px-4 bg-primary/40 h-full w-full'>
                                        <h1 className='text-secondary text-2xl font-bold mb-2' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{item.title}</h1>
                                        <p className='text-white text-sm font-medium mb-4' style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }}>{item.subText}</p>
                                        <Link to="/shop">
                                            <Button className='text-primary bg-secondary/90 backdrop-blur-sm'>
                                                Shop Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
                {categories.map((category, index) => (
                    <div
                        key={category.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                            {/* Image */}
                            <img
                                src={category.image}
                                alt={category.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    {category.title}
                                </h3>
                                <p className="text-white/90 mb-4">
                                    {category.description}
                                </p>
                                <div className="flex items-center text-white group-hover:gap-2 transition-all">
                                    <span>Explore</span>
                                    {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <div className='w-full 2xl:w-[80%] flex flex-col gap-7 2xl:gap-12 lg:flex-row items-center justify-between my-10 lg:px-10 2xl:px-0 px-5 mx-auto'>
                <img src={ad1} className='lg:w-[400px] 2xl:w-[500px] w-full drop-shadow-md' />
                <img src={ad2} className='lg:w-[400px] 2xl:w-[500px] w-full drop-shadow-md' />
                <img src={ad3} className='lg:w-[400px] 2xl:w-[500px] w-full drop-shadow-md' />
            </div> */}
        </div>
    )
}

export default Hero
