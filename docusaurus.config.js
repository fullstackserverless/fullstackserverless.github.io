/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: '#fullStackServerless',
  tagline: 'Full Stack Serverless application = React Native + AWS Amplify',
  url: 'https://fullstackserverless.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'fullstackserverless',
  projectName: 'fullstackserverless.github.io',
  themeConfig: {
    navbar: {
      title: '#fullStackServerless',
      logo: {
        alt: 'React Native Village Logo',
        src: 'img/logo.png',
      },
      links: [
        {
          to: 'docs/startup00',
          activeBasePath: 'docs',
          label: 'Tutorials',
          position: 'left',
        },
        {
          href: 'https://www.patreon.com/fullstackserverless',
          label: 'Patreon',
          position: 'left',
        },
        {
          href: 'https://www.linkedin.com/in/raoffonom',
          label: 'Author',
          position: 'left',
        },
        {
          to: 'blog',
          activeBasePath: 'docs',
          label: 'Vacancies',
          position: 'left',
        },
        {
          href: 'https://github.com/fullstackserverless',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Tutorials',
          items: [
            {
              label: 'Startup',
              to: 'docs/startup00',
            },
            {
              label: 'UI Kit',
              to: 'docs/unicorn00',
            },
            {
              label: 'Authentication',
              to: 'docs/auth1-00',
            },
            {
              label: 'AWS Amplify',
              to: 'docs/amplify-00',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/Ntuttww',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Dev.to',
              href: 'https://dev.to/playra',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/koshasuperstar',
            },
            {
              label: 'Patreon',
              href: 'https://www.patreon.com/fullstackserverless',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/fullstackserverless',
            },
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'img/oss_logo.png',
        href: 'https://opensource.facebook.com/',
      },
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} @playra. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
