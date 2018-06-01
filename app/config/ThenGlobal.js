/**
 * @desc global Conf
 */
const setThenGlobal = () => {
    // process.env.NODE_ENV = 'development',
    // process.env.APP_PATH = process.cwd()
    // console.log(global);
    
    global.NODE_ENV = 'development',
    // global.NODE_ENV = 'production',
    global.APP_PATH = `${process.cwd()}/app`
}
module.exports = setThenGlobal;