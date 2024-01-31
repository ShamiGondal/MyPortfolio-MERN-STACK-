import myimg from '../assets/SAVE_20231214_211847-PhotoRoom.jpg'
import { Helmet } from "react-helmet";

function Moreonme() {
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title className='text-xs'>Shami's Portfolio - More on me | MERN Stack, Game, C++, & React Native Developer</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Crafting Innovative Solutions - Your Vision, My Expertise
                Bring your digital ideas to life with [Ehtisham Ahmed Gondal], a skilled and passionate developer crafting solutions that captivate and engage. Masterful command of [React Native , C++, e.g., MERN Stack, React Native, C++ , Canva, PhotoShop, Figma, Medium-fedility.wireframe]A proven track record of building captivating [types of projects you build, e.g., web applications, mobile apps, games].An unwavering commitment to exceeding expectations and delivering exceptional results" />
                <meta name="keywords" content="web developer, [Lahore JoharTown], Figam, Medium-fedility-wrieframe, canva, photoshop,mobile developer, [Lahore JoharTown] React Native developer, [Lahore JoharTown]  MERN Stack developer, [Lahore JoharTown] freelance developer, [Lahore JoharTown], web developer shami gondal, game developer shami gondal , app developer shami gondal, game developer Ehtisham Ahmed gondal, app developer Ehtisham Ahmed gondal, web developer Ehtisham Ahmed gondal, Canva Designer Ehtisham Ahmed gondal
                ,Photopshop Designer Ehtisham Ahmed gondal, Figma Designer Ehtisham Ahmed gondal, Medium-fedility Designer Ehtisham Ahmed gondal,
                hire [game , app, e.g., web] [Lahore JoharTown] , hobbies, moreonme , more on me , details, intrests, Shami gondal intrests , Ehtisham Ahmed Gondal Intrests , Ehtisham Ahmed Gondal Hobbies" />
                <meta name="author" content="Ehtisham Ahmed Gondal" />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center p-5 mt-20">
                <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center w-fit space-y-5 shadow-md shadow-[#746d6d] bg-slate-100">
                    <div className="">
                        <img src={myimg} alt="Ehtisham's Image" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 md:p-2 lg:p-2 xl:p-2 space-x-4 space-y-4">
                        <h2 className='font-bold'>Hi there!</h2>
                        <p>
                            {`I'm Ehtisham, a Database Engineer at SoftAims currently working on exciting projects related to Full Stack Development. I am pursuing my undergraduate degree at COMSATS ISL as a Computer Science major. With a keen interest in film, I am enthusiastic about exploring the convergence of Computer Science and Visual Arts in areas such as Full Stack Development, Game Development and Design, and UI/UX Design.`}
                        </p>
                        <p dangerouslySetInnerHTML={{ __html: `On a more personal note, I've provided a list of my interests below. If anything grabs your attention, feel free to reach out <a href="mailto:ehtishamahmedgondal@gmail. com" class='text-blue-900 hover:underline'>(ehtishamahmedgondal@gmail.com)</a>, and we can engage in some geeky discussions together!` }}></p>
                        <div className="flex "><h4 className='font-bold mr-2'>TV: </h4><p>Peaky Blinders , Money Heist, Ertugrul , Usman</p></div>
                        <div className="flex "><h4 className='font-bold mr-2'>Movies: </h4><p>Inception , Interstellar , Animal </p></div>
                        <div className="flex "><h4 className='font-bold mr-2'>Games: </h4><p>Last of us  , PUBG, COD </p></div>
                        <div className="flex "><h4 className='font-bold mr-2'>Sport: </h4><p>Volly-ball, Football(CR7)  </p></div>

                    </div>
                </div>
            </div>


        </>
    );
}

export default Moreonme;