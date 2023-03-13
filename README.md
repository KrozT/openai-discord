<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<div align="center" markdown="1">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a>
    <img src="https://i.imgur.com/2UDLbNX.png" alt="Logo" width="300" height="220">
  </a>

<h3 align="center">OpenAI Discord</h3>

  <p align="center">
    A very simple Discord Bot that integrates the OpenAI library to make use of ChatGPT
    <br />
    <a href="https://github.com/KrozT/openai-discord"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://discord.com/oauth2/authorize?client_id=1084340374010593311&permissions=534723950656&scope=bot">View Demo</a>
    ·
    <a href="https://github.com/KrozT/openai-discord/issues">Report Bug</a>
    ·
    <a href="https://github.com/KrozT/openai-discord/pulls">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
        <li><a href="#packages">Packages</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#commands">Commands</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
Formally called 'Aurora GPT', it is a very simple Discord chatbot that was built using discord.js and the GPT-3.5-Turbo of OpenAI.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![TypeScript][TypeScript-shield]][TypeScript-url]

### Packages
- [discord.js](https://github.com/discordjs/discord.js)
- [winston](https://github.com/winstonjs/winston)
- [openai-node](https://github.com/openai/openai-node)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Get a neccesary API Keys
- [OpenAI](https://platform.openai.com/account/api-keys)
- [Discord](https://platform.openai.com/account/api-keys)
<br>

2. Clone the repo
   ```sh
   git clone https://github.com/KrozT/openai-discord.git
   ```
3. Install packages
   ```sh
   yarn install
   ```
4. Add the API Keys to your environment variables
   ```sh
   DISCORD_API_KEY='YOUR DISCORD API KEY'
   OPENAI_API_KEY='YOUR OPENAI API KEY'
   ```
5. Build project
   ```sh
   yarn run build
   ```
6. Start binaries
   ```sh
   yarn run start
   ```
   

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Once you have the project initialized
just add the chat bot to your server and enjoy.

### Commands
| Command | Description |
| --- | --- |
| `/ping` | A very simple ping command |
| `/chat` | Say anything to the Chat Bot |
| `/clear` | Delete your interactions with the Chat bot |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Discord Integration
- [x] OpenAI Integration
- [x] Context-based single-user usability
- [ ] Simultaneous context-based multi-user usability
- [ ] Client-based multi-language UI support

See the [open issues](https://github.com/KrozT/openai-discord/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourAmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some YourAmazingFeature'`)
4. Push to the Branch (`git push origin feature/YourAmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Othneil Drew](https://github.com/othneildrew/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/KrozT/openai-discord.svg?style=for-the-badge
[contributors-url]: https://github.com/KrozT/openai-discord/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/KrozT/openai-discord.svg?style=for-the-badge
[forks-url]: https://github.com/KrozT/openai-discord/network/members
[stars-shield]: https://img.shields.io/github/stars/KrozT/openai-discord.svg?style=for-the-badge
[stars-url]: https://github.com/KrozT/openai-discord/stargazers
[issues-shield]: https://img.shields.io/github/issues/KrozT/openai-discord.svg?style=for-the-badge
[issues-url]: https://github.com/KrozT/openai-discord/issues
[license-shield]: https://img.shields.io/github/license/KrozT/openai-discord.svg?style=for-the-badge
[license-url]: https://github.com/KrozT/openai-discord/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/matias-espinoza-bustos/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

[TypeScript-url]: https://www.typescriptlang.org
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white