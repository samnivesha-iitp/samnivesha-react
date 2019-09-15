import React from 'react';
export default function App() {
  return (
    <section className="hero is-fullheight is-light" >
			<div className="hero-head">
				<nav className="navbar is-transparent is-spaced" role="navigation" aria-label="main navigation">
					<div className="container">
						<div className="navbar-brand">
							<a className="navbar-item" href="/">
								<img src="/images/samnivesha.png" alt="Bulma Rent" width="34" height="20"/>
							</a>

							<a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarTopMain">
								<span aria-hidden="true"></span>
								<span aria-hidden="true"></span>
								<span aria-hidden="true"></span>
							</a>
						</div>
						<div className="navbar-menu" id="navbarTopMain">
							<div className="navbar-end">
								<a href="#"
								className="navbar-item has-text-weight-semibold">
								<span>Blog</span>
								<span className="tag is-success m-l-5">NEW</span>
							</a>
							<a href="#"
							className="navbar-item has-text-weight-semibold">About</a>
							<a href="#"
							className="navbar-item has-text-weight-semibold">Contact Us</a>
							<a href="#" className="navbar-item has-text-weight-semibold">Schedule</a>
							<div className="navbar-item">
								<a href="https://aldi.github.io/awesome-bulma-templates/templates/login.html" className="button is-primary">
									Sign in
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
		<div className="hero-body  p-b-30 ">
			<div className="container">
				<h2 className="subtitle">
					<span className="has-text-centered is-block">
					Association of Civil engineers of IIT Patna presents
					</span>
				</h2>
				<h1 className="title">
					<span className="is-size-1  has-text-centered is-block">Samnivesh'20</span>
				</h1>
				<div className="has-text-centered">
					<img className="m-t-50" src="images/property_image.png" alt="Find rentals" />
				</div>
			</div>
		</div>

	</section>
  );
}