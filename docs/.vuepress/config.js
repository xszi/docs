module.exports = {
    base: '/blog/',
    dest: 'dist',
    title: '乘风BLOG',
    description: '',
    themeConfig: {
        editLinks: false,
        docsDir: 'docs',
        nav: [{
                text: '算法',
                link: '/algorithms/'
            },
            {
                text: '博文',
                items: [{
                        text: '初识 TypeScript',
                        link: '/chapter1/'
                    }
                ]
            },
            {
                text: '关于',
                link: '/about/'
            },
            {
                text: 'Github',
                link: 'https://www.github.com/xszi'
            },
        ],
        sidebar: [{
                title: '初识 TypeScript',
                collapsable: false,
                children: [
                    ['chapter1/', 'Introduction'],
                    'chapter1/install',
                    'chapter1/start'
                ]
            }
        ]
    }
}