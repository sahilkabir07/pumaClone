import React from 'react'
import AboutManagementCards from './AboutMangementCards'

const AboutManagement = () => {
    return (
        <div className="p-4">
            <p className='font-bold text-xl text-center mt-10 hover:text-red-500 hover:underline'>
                MANAGEMENT BOARD
            </p>
            <div className='flex flex-wrap gap-8 mt-12 justify-center'>
                <AboutManagementCards
                    src="https://about.puma.com/sites/default/files/styles/dd_default_mobile/public/media/images/arne-freundt.png?itok=mq8aGWde"
                    title="ARNE FREUNDT"
                    info="CEO, CCO"
                />
                <AboutManagementCards
                    src="https://about.puma.com/sites/default/files/styles/dd_default_mobile/public/media/images/m22_markusneubrand_1.jpg?itok=GhSc7Gfg"
                    title="MARKUS NEUBRAND"
                    info="CHIEF FINANCIAL OFFICER"
                />
                <AboutManagementCards
                    src="https://about.puma.com/sites/default/files/styles/dd_default_mobile/public/media/images/m22_mariavaldes.jpg?itok=qTF9xfAD"
                    title="MARIA VALDES"
                    info="CHIEF PRODUCT OFFICER"
                />
            </div>
        </div>
    )
}

export default AboutManagement
