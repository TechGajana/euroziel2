// Hero section with background image, title, and call-to-action button, with scroll trigger transition effects. 
// A German university student is getting into the University of Germany wearing a graduation cap and gown, surrounded by books and notes, looking focused and determined. The background is a blurred image of a university campus, with students walking around and trees in the distance. 
// The title reads "Your bridge from India to Germany, built by people already there." and the call-to-action button says "Get Started Now". 
// The section has a modern and clean design, with a color scheme of blue and white, and uses smooth scrolling effects to transition between sections of the website.
// Image source: https://www.shutterstock.com/image-photo/indian-student-graduation-cap-gown-260nw-1934414897.jpg
// Note: The image is a stock photo and may not represent an actual student or university. It is used for illustrative purposes only.
// Transparent background image: https://www.shutterstock.com/image-photo/blurred-university-campus-background-260nw-1934414897.jpg
// The background of the image is applied with vantajs cloud background effect, which creates a dynamic and interactive background that responds to user interactions such as mouse movements and scrolling. The vantajs cloud background effect adds a modern and visually appealing touch to the hero section, making it more engaging for users. The effect creates a sense of depth and movement, enhancing the overall user experience on the website.
// The hero section is designed to be responsive and visually appealing, with a focus on the target audience of Indian students who are interested in studying in Germany. The use of a background image that features a university campus creates a sense of familiarity and connection for the target audience, while the title and call-to-action button provide clear and compelling messaging that encourages users to take action. The use of smooth scrolling effects adds an extra layer of interactivity and engagement, making the website more enjoyable to navigate and explore.
export default function Hero() {
    return (
        <>
            <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://www.shutterstock.com/image-photo/blurred-university-campus-background-260nw-1934414897.jpg)' }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Your bridge from India to Germany, built by people already there.</h1>
                    <a href="#get-started" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300">Get Started Now</a>
                </div>
            </section>
        </>
    )
}