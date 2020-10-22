const formatXwml = (webappHtml) =>{
    webappHtml = webappHtml.toString().match(/<body>[\d\D]+<\/body>/g)[0]
    webappHtml = webappHtml.replace(/<body>/g, '<view>')
    webappHtml = webappHtml.replace(/<\/body>/g, '</view>')
    webappHtml = webappHtml.replace(/<div /g, '<view ')
    webappHtml = webappHtml.replace(/<\/div>/g, '</view>')
    webappHtml = webappHtml.replace(/<img /g, '<image ')
    webappHtml = webappHtml.replace(/<a /g, '<navigator ')
    webappHtml = webappHtml.replace(/<\/a>/g, '</navigator>')
    webappHtml = webappHtml.replace(/ href=/g, ' url=')
    webappHtml = webappHtml.replace(/<\/a>/g, '</navigator>')
    return webappHtml
}
module.exports = {
    formatXwml
}