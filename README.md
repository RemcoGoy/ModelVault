<h1 align="center">
  <a href="https://github.com/RemcoGoy/ModelVault">
    <!-- Please provide path to your logo here -->
    <img src="docs/images/logo.svg" alt="Logo" width="175" height="175">
  </a>
</h1>

<div align="center">
  ModelVault
  <br />
  <a href="#about"><strong>Explore the screenshots »</strong></a>
  <br />
  <br />
  <a href="https://github.com/RemcoGoy/ModelVault/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/RemcoGoy/ModelVault/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  .
  <a href="https://github.com/RemcoGoy/ModelVault/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+">Ask a Question</a>
</div>

<div align="center">
<br />

[![Project license](https://img.shields.io/github/license/RemcoGoy/ModelVault.svg)](LICENSE)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/RemcoGoy/ModelVault?filename=frontend%2Fpackage.json)](frontend/package.json)


[![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/RemcoGoy/ModelVault)](https://github.com/RemcoGoy/ModelVault/issues)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/RemcoGoy/ModelVault/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![code with love by RemcoGoy](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-RemcoGoy-ff1414.svg)](https://github.com/RemcoGoy)

</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Support](#support)
- [Project assistance](#project-assistance)
- [Contributing](#contributing)
- [Authors & contributors](#authors--contributors)
- [Security](#security)
- [License](#license)
- [Acknowledgements](#acknowledgements)

</details>

---

## About

<table><tr><td>

> **[!]** This project is under active development. This means the codebase is subject to frequent changes, and features may be unstable or incomplete. While we welcome contributions and feedback, please be aware that things might break unexpectedly.

> **[?]**
> Provide general information about your project here.
> What problem does it (intend to) solve?
> What is the purpose of your project?
> Why did you undertake it?
> You don't have to answer all the questions -- just the ones relevant to your project.

<details>
<summary>Screenshots</summary>
<br>

> **[?]**
> Please provide your screenshots here.

|                               Home Page                               |                               Login Page                               |
| :-------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| <img src="docs/images/screenshot.png" title="Home Page" width="100%"> | <img src="docs/images/screenshot.png" title="Login Page" width="100%"> |

</details>

</td></tr></table>

### Built With

> **[?]**
> Please provide the technologies that are used in the project.

## Getting Started

### Prerequisites

> **[?]**
> What are the project requirements/dependencies?

### Installation (locally)

#### Backend

```bash
cd backend
uvicorn main:app [--reload]
```

#### Frontend

```bash
cd frontend
npm run dev
```

### Installation (local Docker)

#### Backend

```bash
cd backend
docker build -t modelvault-backend:latest .
docker run -d -p 8000:8000 modelvault-backend:latest
```

#### Frontend

```bash
cd frontend
docker build -t modelvault-frontend:latest .
docker run -d -p 3000:3000 modelvault-frontend:latest
```

## Usage

> **[?]**
> How does one go about using it?
> Provide various use cases and code examples here.

## Roadmap

See the [open issues](https://github.com/RemcoGoy/ModelVault/issues) for a list of proposed features (and known issues).

- [Top Feature Requests](https://github.com/RemcoGoy/ModelVault/issues?q=label%3Aenhancement+is%3Aopen+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Top Bugs](https://github.com/RemcoGoy/ModelVault/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Newest Bugs](https://github.com/RemcoGoy/ModelVault/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

## Support

> **[?]**
> Provide additional ways to contact the project maintainer/maintainers.

Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/RemcoGoy/ModelVault/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [this GitHub profile](https://github.com/RemcoGoy)

## Project assistance

If you want to say **thank you** or/and support active development of ModelVault:

- Add a [GitHub Star](https://github.com/RemcoGoy/ModelVault) to the project.
- Tweet about the ModelVault.
- Write interesting articles about the project on [Dev.to](https://dev.to/), [Medium](https://medium.com/) or your personal blog.

Together, we can make ModelVault **better**!

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.


Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Authors & contributors

The original setup of this repository is by [Remco Goyvaerts](https://github.com/RemcoGoy).

For a full list of all authors and contributors, see [the contributors page](https://github.com/RemcoGoy/ModelVault/contributors).

## Security

ModelVault follows good practices of security, but 100% security cannot be assured.
ModelVault is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](docs/SECURITY.md)._

## License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.

## Acknowledgements

> **[?]**
> If your work was funded by any organization or institution, acknowledge their support here.
> In addition, if your work relies on other software libraries, or was inspired by looking at other work, it is appropriate to acknowledge this intellectual debt too.
