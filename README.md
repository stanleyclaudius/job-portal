<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/stanleyclaudius/job-portal">
    <img src="public/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Job Portal Application</h3>

  <p align="center">
    An awesome job portal application based on website
    <br />
    <a href="https://github.com/stanleyclaudius/job-portal.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://job-portal-six.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/stanleyclaudius/job-portal/issues">Report Bug</a>
    ·
    <a href="https://github.com/stanleyclaudius/job-portal/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

**Job Portal Application** is a web application that have 3 main roles inside it, such as admin, organization, and also jobseeker. A jobseeker role can find and apply job to a certain opened job by an organization like usual, uploading their CV, edit their profile, etc. An organization role has access to post a job, hire and reject applicant, etc. An admin role will mainly keep track of organization that are registered to the application, then decide whether to accept or reject the organization based on the information provided.

<p align="right"><a href="#top">back to top</a></p>

### Built With

Main technology used to built this application are listed below:

* [Typescript](https://www.typescriptlang.org/)
* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [MongoDB](https://mongodb.com/cloud/atlas/)
* [Vercel](https://vercel.com)

<p align="right"><a href="#top">back to top</a></p>

## Getting Started

To get started with this project locally, follow below steps:

### Prerequisites

Make sure you have package manager (either npm or yarn)

>**FYI**: This project uses **yarn** as package manager, but you're free to use **npm** too.

* Install Yarn (Only for user who want to use **yarn**)
  ```
  npm i -g yarn
  ```

### Installation

Below steps will guide you through the local installation process of this application

1. Get your **Google Client ID**, **Google Client Secret**, and also **GMail Refresh Token** from [here](https://console.developers.google.com/)
2. Get your MongoDB cloud connection at [here](https://mongodb.com/cloud/atlas)
3. Clone the repo
   ```
   git clone https://github.com/stanleyclaudius/job-portal.git
   ```
4. Install project dependency<br />
Make sure that your terminal pointing at the root directory of this project (job-portal folder).
   ```
   yarn install && cd client && yarn install
   ```
5. Complete the .env.local variable<br/>
Rename .env.local.example file at ```job-portal``` directory become ```.env.local```, then fill the value for every key. Below is the guideline for filling the .env value:<br/>
    | Key | What To Fill | Example Value |
    | :---: | :---: | :---: |
    | CLIENT_URL | Your client side URL | http://localhost:3000 |
    | MONGO_URL | Your MongoDB URL | mongodb://user:user1234@main-shardxxxx |
    | ACCESS_TOKEN_SECRET | Random complex string for JWT | DUhxdx183)_--aACN#2%
    | REFRESH_TOKEN_SECRET | Random complex string for JWT | 17hdjcD7ud(-*&732~
    | ACTIVATION_TOKEN_SECRET | Random complex string for JWT | kc81i^&%`-Did##1Z
    | GOOGLE_CLIENT_ID | Your google client ID | 3392348929324-tarur228dxxx |
    | GOOGLE_CLIENT_SECRET | Your google client secret | GOCSPX-xxxxxxx |
    | GMAIL_REFRESH_TOKEN | Your gmail refresh token | 1//028dhdjBMudu2829xxx |
    | MAIL_SENDER_ADDRESS | Email that want to be used to send mail | example@gmail.com |
6. Lastly, run below command at your terminal to spin off the application
    ```
    yarn dev
    ```

<p align="right"><a href="#top">back to top</a></p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right"><a href="#top">back to top</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#top">back to top</a></p>

## Contact

LinkedIn: [Stanley Claudius](https://www.linkedin.com/in/stanley-claudius-4560b21b7)

Project Link: [https://github.com/stanleyclaudius/job-portal](https://github.com/stanleyclaudius/job-portal)

<p align="right"><a href="#top">back to top</a></p>

## Acknowledgments

Special thanks to:

* [Othneildrew](https://github.com/othneildrew/) for providing an amazing README template.
* [React Icons](https://react-icons.github.io/react-icons/) for providing icon to be used in this application.
* [Tailwind CSS](https://tailwindcss.com/) for providing CSS framework to be used in this application.
* [Vercel](https://vercel.com) for providing hosting service for this application.

<p align="right"><a href="#top">back to top</a></p>

[forks-shield]: https://img.shields.io/github/forks/stanleyclaudius/job-portal.svg?style=for-the-badge
[forks-url]: https://github.com/stanleyclaudius/job-portal/network/members
[stars-shield]: https://img.shields.io/github/stars/stanleyclaudius/job-portal.svg?style=for-the-badge
[stars-url]: https://github.com/stanleyclaudius/job-portal/stargazers
[issues-shield]: https://img.shields.io/github/issues/stanleyclaudius/job-portal.svg?style=for-the-badge
[issues-url]: https://github.com/stanleyclaudius/job-portal/issues
[license-shield]: https://img.shields.io/github/license/stanleyclaudius/job-portal.svg?style=for-the-badge
[license-url]: https://github.com/stanleyclaudius/job-portal/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanley-claudius-4560b21b7