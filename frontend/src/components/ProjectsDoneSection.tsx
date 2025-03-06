import { useState } from 'react';
import { Link } from 'react-router-dom'

import { FaArrowRightLong } from "react-icons/fa6";


import Creative1 from '/1.jpg';
import Creative2 from '/2.jpg';
import Creative3 from '/3.jpg';
import Creative4 from '/4.jpg';
import Creative5 from '/5.jpg';
import Creative6 from '/6.jpg';
import Creative7 from '/7.jpg';
import Creative8 from '/8.jpg';
import Creative9 from '/9.jpg';
import Creative10 from '/10.jpg';
import Creative11 from '/11.jpg';
import Creative12 from '/12.jpg';
import Creative13 from '/13.jpg';


const tabs = [
    { id: 0, title: 'Websites' },
    { id: 1, title: 'Creatives' },
    { id: 2, title: 'Links' },
];

const websites = [
    { id: 0, websiteName: "Metco Impex", link: "/" },
    { id: 1, websiteName: "rakeshenterprise", link: "/" },
    { id: 2, websiteName: "swarexexports", link: "/" },
    { id: 3, websiteName: "mycampusstudyabroad", link: "/" },
    { id: 4, websiteName: "surgilife.in", link: "/" },
    { id: 5, websiteName: "Papaji", link: "/" },
];

const creatives = [
    Creative1,
    Creative2,
    Creative3,
    Creative4,
    Creative5,
    Creative6,
    Creative7,
    Creative8,
    Creative9,
    Creative10,
    Creative11,
    Creative12,
    Creative13,
];



const ProjectsDoneSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl uppercase font-semibold">Projects Done</h1>
                <div className="flex items-center justify-center space-x-2 my-2 ">
                    {tabs.map((tab) => (
                        <>
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setTimeout(() => {
                                        window.scrollTo({ top: 600, behavior: 'smooth' });
                                    }, 50); // Small delay ensures scrolling happens after re-render
                                }}
                                className={`${activeTab === tab.id ? 'text-white bg-black' : 'text-black'} text-base font-medium px-4 py-1.5 rounded`}
                            >
                                {tab.title}
                            </button>
                            {/* {tab.id !== tabs.length - 1 && <span className="mx-1">/</span>} */}
                        </>
                    ))}
                </div>
            </div>

            {/* Content Section: Displays based on activeTab */}

            <div className="my-6">

                {/* For Websites */}
                {activeTab === 0 && (
                    <div>
                        <div className="w-full">
                            {/* <h2 className="text-3xl font-semibold text-center mt-4 mb-8 uppercase">Our Websites</h2> */}
                            <div className="bg-white border-2 border-black px-6 pt-1.5 rounded-md shadow-lg">
                                {websites.map((website) => (
                                    <>
                                        <div
                                            key={website.id}
                                            className="flex justify-between items-center mt-1 py-2.5 px-0 mb-2 rounded  transition-all "
                                        >
                                            <span className="text-lg font-medium text-gray-800">{website.websiteName}</span>
                                            <Link
                                                to={website.link}
                                                className="group flex items-center px-4 py-1.5 text-lg hover:text-blue-700 rounded-sm font-medium  transition-all duration-75"
                                            >
                                                <p>View site</p> <FaArrowRightLong className='h-5 w-5 flex-shrink-0 ml-3 group-hover:-rotate-45 transition-all' />
                                            </Link>
                                        </div>
                                        {website.id !== websites.length - 1 && <hr className='border-gray-800' />}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* For Creatives */}
                {activeTab === 1 && (
                    <div>
                        {/* <h2 className="text-3xl font-semibold text-center uppercase">Our Creatives</h2> */}
                        <div className="grid grid-cols-3 gap-4 my-4">
                            {creatives.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt="Creative" className="h-full w-full aspect-[6/6] object-fit rounded border-4 border-white hover:border-black hover:shadow-2xl transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* For Links */}
                {activeTab === 2 && (
                    <div>
                        <video
                            src='https://ik.imagekit.io/ikmedia/example_video.mp4'
                            poster={''}
                            width='full'
                            height='680'
                            controls
                            autoPlay={false}
                            muted
                            playsInline
                         
                        />
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProjectsDoneSection;
