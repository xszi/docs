module.exports = {
    base: '/blog/',
    dest: 'dist',
    title: '行书子',
    description: '',
    themeConfig: {
        editLinks: false,
        docsDir: 'docs',
        nav: [{
                text: '前端算法',
                link: 'https://github.com/xszi/javascript-algorithms'
            },
            {
                text: '机器学习',
                link: 'https://github.com/xszi/javascript-algorithms'
            },
            {
                text: '感悟杂记',
                link: 'https://github.com/xszi/javascript-algorithms'
            },
            {
                text: 'Github',
                link: 'https://www.github.com/xszi'
            },
        ],
        sidebar: [{
                title: '2021训练专题',
                collapsable: false,
                children: [
                    'topic/algorithms',
                    'topic/webpack',
                    'topic/monitor'
                ]
            }, {
                title: 'TypeScript',
                collapsable: false,
                children: [
                    'typescript/intro',
                    'typescript/install',
                    'typescript/start'
                ]
            }
        ]
    }
}