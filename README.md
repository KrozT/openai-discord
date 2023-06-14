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
    <img src="https://i.imgur.com/aqhWIDI.png" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">OpenAI Discord</h3>

<div align="center">

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d6c618e969974283b69ba6cb9e16bbd5)](https://app.codacy.com/gh/KrozT/openai-discord/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

</div>

  <p align="center">
A simple Discord bot integrating OpenAI libraries for ChatGPT and DALL-E, capable of generating text and images in Discord conversations.    <br />
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
        <li><a href="#screenshots">Screenshots</a></li>
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
        <li><a href="#options">Options</a></li>
        <li><a href="#embeds">Embeds</a></li>
      </ul>
    </li>
    <li><a href="#commands-api">Commands API</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Formerly known as 'Aurora AI', Aurora AI is a Discord chatbot that utilizes the GPT-3.5-Turbo language model by OpenAI. Built with discord.js, it generates responses to user input in a conversational format. Designed for simplicity, it's a great tool to explore the capabilities of GPT-3.5-Turbo within Discord. Additionally, it also supports the use of DALL-E, the image generation model also developed by OpenAI, allowing it to generate creative images alongside its natural language abilities.

### Screenshots
<details>

<summary>Images</summary>

[![Aurora AI ScreenShot 1][product-screenshot-1]](https://github.com/KrozT/openai-discord)
[![Aurora AI ScreenShot 2][product-screenshot-2]](https://github.com/KrozT/openai-discord)


</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![TypeScript][TypeScript-shield]][TypeScript-url]

### Packages
- [discord.js](https://github.com/discordjs/discord.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [openai-node](https://github.com/openai/openai-node)
- [winston](https://github.com/winstonjs/winston)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Get a necessary API Keys
   - [OpenAI](https://platform.openai.com/account/api-keys)
   - [Discord](https://platform.openai.com/account/api-keys)
   <br>

2. Clone the repo
   ```shell
   git clone https://github.com/KrozT/openai-discord.git
   ```
3. Install packages
   ```shell
   pnpm install
   ```
4. Add the API Keys to your environment variables
   ```dotenv
   DISCORD_API_KEY=<YOUR DISCORD API KEY>
   OPENAI_API_KEY=<YOUR OPENAI API KEY>
   ```
5. Build project
   ```shell
   pnpm run build
   ```
6. Start binaries
   ```shell
   pnpm run start
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Once you have the project initialized
just add the bot to your server and enjoy.

### Commands
| Command  | Options                                | Type                             | Description                                |
|----------|----------------------------------------|----------------------------------|--------------------------------------------|
| `/ping`  | `ephimeral`                            | `embed-info`                     | Ping the bot to check if it is online      |
| `/about` | `ephimeral`                            | `embed-info`                     | Get information about the bot              |
| `/help`  | `ephimeral`                            | `embed-info`                     | Get a list of all the commands             |
| `/chat`  | `question` `ephimeral`                 | `embed-request` `embed-response` | Chat with the bot                          |
| `/clear` | `amount`                               | `embed-info`                     | Clear the chat history with the bot        |
| `/image` | `prompt` `quantity` `size` `ephimeral` | `embed-request` `embed-response` | Generate an image with the prompt provided |

#### Options
| Option      | Command                                   | Required | Default   | Choices                         | Description                         |
|-------------|-------------------------------------------|----------|-----------|---------------------------------|-------------------------------------|
| `question`  | `/chat`                                   | `true`   | None      | None                            | The question to ask the bot         |
| `prompt`    | `/image`                                  | `true`   | None      | None                            | The text to generate the image from |
| `quantity`  | `/image`                                  | `false`  | `1`       | `1` to `10`                     | Quantity of images to generate      |
| `size`      | `/image`                                  | `false`  | `256x256` | `256x256` `512x512` `1024x1024` | Size of the image to generate       |
| `amount`    | `/clear`                                  | `false`  | `100`     | `1` to `100`                    | Amount of messages to clear         |
| `ephimeral` | `/ping` `/about` `/help` `/chat` `/image` | `false`  | `false`   | `true` `false`                  | Hide the response from other users  |


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Embeds
The bot uses a variety of visual embeds code located in the footer of each message. The following table describes the embeds and their colors.

| Footer           | Color | Description                                   |
|------------------|-------|-----------------------------------------------|
| `embed-info`     | Aqua  | System message by the bot                     |
| `embed-error`    | Red   | Error message by the bot                      |
| `embed-response` | Green | Response by the bot with AI-generated content |
| `embed-request`  | Gold  | Request by the user                           |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Commands API

You can add new commands to the project by following these steps:

1. Create a new file in the `src/bot/commands` folder with the name of the command you want to add (e.g. `testCommand.ts`).
2. Write a class that extends the `Command` and implements all the methods.
3. Your command will be automatically added to the bot.

Command example:
```ts
import { Command } from '@/bot/models/command';
import { Client, CommandInteraction } from 'discord.js';

export class TestCommand extends Command {
    public configure(): void {
        this.setName('test');
        this.setDescription('Test command');
        this.addEphemeralOption(); // Add the ephemeral option to the command
    }

    protected async execute(client: Client, interaction: CommandInteraction): Promise<void> {
        await interaction.reply({content: 'Test command executed', ephemeral: this.ephermeral});
    }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Docker Integration
  - [x] Dockerfile
  - [x] Docker Compose
- [x] Discord Integration
  - [x] API REST
  - [x] Slash Commands
  - [x] Text Channels
    - [x] Ephemeral (Optional)
  - [x] Direct Messages
    - [x] Ephemeral (Optional)
- [x] Language Model Integration
  - [x] GPT-3.5
    - [x] Chat
  - [ ] GPT-4
- [x] DALL-E Integration
  - [x] Image generation
  - [ ] Image editing
- [x] Context-based usability
  - [x] Single user
  - [ ] Multiple users

See the [open issues](https://github.com/KrozT/openai-discord/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
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
[product-screenshot-1]: https://i.imgur.com/7htpBfP.png
[product-screenshot-2]: https://i.imgur.com/klnL7X4.png
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
