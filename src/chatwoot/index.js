
let id_conversaion = null;
/**
 * Es la funciona que importa para guardar los mensajes y crear lo que sea necesario
 * @param {*} dataIn pasando los datos del contacto + el mensaje
 * @param {*} chatwoot la dependencia del chatwoot...(create, buscar...)
 */
const handlerMessage = async (dataIn = {phone:'', name:'', message: '', mode:'', attachment:[]}, chatwoot) => {
    const inbox = await chatwoot.findOrCreateInbox({ name: 'CLYSA' })
    const contact = await chatwoot.findOrCreateContact({ from: dataIn.phone, name: dataIn.name})
    const conversation = await chatwoot.findOrCreateConversation({
        inbox_id: inbox.id,
        contact_id: contact.id,
        phone_number: dataIn.phone
    })
    const message = await chatwoot.createMessage({
        msg: dataIn.message, 
        mode: dataIn.mode, 
        conversation_id: conversation.id,
        attachment: dataIn.attachment
    })
    id_conversaion = message.conversation_id
}
const asignarEquipo = async (dataIn, chatwoot) => {
    const response = await chatwoot.assignTeam(dataIn = { conversation_id: id_conversaion, team_Id: dataIn.team})
    console.log("asignarEquipo index chatwoot:",response);
    //await chatwoot.assignAgent(dataIn = { conversation_id: id_conversaion})
}


module.exports = { handlerMessage , asignarEquipo}