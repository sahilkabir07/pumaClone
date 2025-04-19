import React from 'react'

const AboutManagementCards = ({ src, title, info }) => {
    return (
        <div
            style={{ backgroundImage: `url(${src})` }}
            className="flex flex-col justify-center items-center bg-cover bg-center h-64 sm:h-80 w-full sm:w-1/3 relative rounded-xl shadow-lg overflow-hidden"
        >
            <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay for better text visibility */}
            <p
                className="absolute bottom-8 p-4 font-bold text-white uppercase transition-transform transform duration-300 ease-in-out hover:scale-110 hover:translate-y-2 hover:text-blue-400"
            >
                {title}
            </p>
            <p
                className="absolute bottom-2 p-4 text-white transition-transform transform duration-300 ease-in-out hover:scale-110 hover:translate-y-2 hover:text-blue-400"
            >
                {info}
            </p>
        </div>
    )
}

export default AboutManagementCards
