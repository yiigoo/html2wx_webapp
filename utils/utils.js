const formatXwml = (webappHtml) =>{
    webappHtml = webappHtml.toString().match(/<body>[\d\D]+<\/body>/g)[0]
    webappHtml = webappHtml.replace(/<body>/g, '<view>')
    webappHtml = webappHtml.replace(/<\/body>/g, '</view>')
    webappHtml = webappHtml.replace(/<div /g, '<view ')
    webappHtml = webappHtml.replace(/<\/div>/g, '</view>')

    webappHtml = webappHtml.replace(/<a href=/g, '<navigator url=')
    webappHtml = webappHtml.replace(/<\/a>/g, '</navigator>')
    return webappHtml
}
module.exports = {
    formatXwml
}