module.exports = function(grunt) {
    grunt.initConfig({
        // �����ļ����ο�package.json���÷�ʽ��������������
        // name, version, author
        // name��Ϊgallery�������ģ����
        // version�ǰ汾��Ҳ�Ƿ���Ŀ¼
        // author������{name: "xxx", email: "xxx"}��ʽ
        pkg: grunt.file.readJSON('abc.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // kmc�������Ĭ�����������ļ���index.js�����������������ļ�����files����
        // ���
        kmc: {
            options: {
                packages: [
                    {
                        name: '<%= pkg.name %>',
                        path: '../'
                    }
                ],
                map: [["<%= pkg.name %>/", "gallery/<%= pkg.name %>/"]]
            },
            main: {
                files: [
                    {
                        src: "<%= pkg.version %>/matchmedia/index.js",
                        dest: "<%= pkg.version %>/build/matchmedia/index.js"
                    },
                    {
                        src: "<%= pkg.version %>/mediaquerypolyfill/index.js",
                        dest: "<%= pkg.version %>/build/mediaquerypolyfill/index.js"
                    },
                    {
                        src: "<%= pkg.version %>/picturepolyfill/index.js",
                        dest: "<%= pkg.version %>/build/picturepolyfill/index.js"
                    }
                ]
            }
        },
        // �����ѹ���ļ�
        // ѹ���ļ�������ļ�һһ��Ӧ
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            base: {
                files: {
                    '<%= pkg.version %>/build/matchmedia/index-min.js': ['<%= pkg.version %>/build/matchmedia/index.js'],
                    '<%= pkg.version %>/build/mediaquerypolyfill/index-min.js': ['<%= pkg.version %>/build/mediaquerypolyfill/index.js'],
                    '<%= pkg.version %>/build/picturepolyfill/index-min.js': ['<%= pkg.version %>/build/picturepolyfill/index.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/* minified css file */'
            },
            base: {
                files: {
                    '<%= pkg.version %>/build/responsiveform/formmedia-min.css': ['<%= pkg.version %>/responsiveform/formmedia.css'],
                    '<%= pkg.version %>/build/responsiveform/formsearch-min.css': ['<%= pkg.version %>/responsiveform/formsearch.css'],
                    '<%= pkg.version %>/build/responsiveform/iehack.css-min': ['<%= pkg.version %>/responsiveform/iehack.css'],
                    '<%= pkg.version %>/build/responsiveform/pagestyle-min.css': ['<%= pkg.version %>/responsiveform/pagestyle.css']
                }
            }
        }
    });

    // ʹ�õ������񣬿���������������
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    return grunt.registerTask('default', ['kmc', 'uglify','cssmin']);
};
