import { Link } from "react-router-dom";

const About = () => {
	return (
		<div className="About">
			<div className="home-button-box">
				<Link to="/" className="home-button">HOME</Link>
			</div>
			<div className="about-box">
				<div className="about-box-header">
					<h1>Welcome!</h1>
				</div>
				<div className="about-box-text">
					<p>Here is my GitHub: <a href="https://github.com/thisisnothappening">https://github.com/thisisnothappening</a></p>
					<p>Here is my frontend repository: <a href="https://github.com/thisisnothappening/Java-Encyclopedia-Project-Frontend">https://github.com/thisisnothappening/Java-Encyclopedia-Project-Frontend</a></p>
					<p>Here is my backend repository: <a href="https://github.com/thisisnothappening/nodejs-encyclopedia-project">https://github.com/thisisnothappening/nodejs-encyclopedia-project</a></p>
					<br />
					<p>This is the first website that I made.</p>
					<p>I uploaded this website to learn more about web developing.</p>
					<p>The only purpose of this website is my learning experience, and you shouldn't judge me for anything you don't like.</p>
					<br />
					<p>You can click on one of the cards listen in the main page to see information about that subject.</p>
					<p>You can also filter by name and category</p>
					<p>You can also add, edit, or delete articles if you are logged in.</p>
					<p>You can only sign up if you have the secret code, which is given by the developer (me). The reason for this is to avoid random people deleting or editing everything, thus ruining the website. Normally, your changes would need be accepted by the others in order to take effect, but I chose the simpler method, to only allow some trusted people to make changes. It's not supposed to be a helpful or serious website after all.</p>
				</div>
			</div>
		</div>
	);
};

export default About;