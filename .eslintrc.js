module.exports = {
    root: true, // 此项是用来告诉eslint找当前配置文件不能往父级查找
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true,
        // node: true,
        // es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    plugins: [
        "vue"
    ],
    rules: {
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/max-attributes-per-line": ["error", {
            "singleline": 3,
            "multiline": {
                "max": 5,
                "allowFirstLine": false
            }
        }],
        'indent': [2, 4], // 缩进4
        'comma-dangle': 0, // 对象字面量项尾不能有逗号
        'new-cap': 0, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
        'no-console': 0,// 禁止使用console
        'no-extra-semi': 0, // 禁止多余的冒号
        'no-new': 0, // 禁止在使用new构造一个实例后不赋值
        'no-undef': 0, // 不能有未定义的变量
        'quote-props': 0, // 属性名不限制
        'space-before-function-paren': [2, 'never'], // 函数定义时括号前面要不要有空格
        'semi': [2, 'never'], // 语句强制分号结尾
        'no-unused-expressions': 'off', // 禁止无用的表达式
        'generator-star-spacing': 'off', // 生成器函数*的前后空格
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 禁止使用debugger
        'no-irregular-whitespace': 'off'
    }
}
