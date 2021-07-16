import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response) {

    if (request.method === 'POST') {

        const TOKEN = process.env.TOKEN_ACCESS

        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: '968539',

            ...request.body,
            /*  title: 'commuity-test',
             imageUrl: 'http://github.com/andermsilva.png',
             creatorSlug: 'andermsilva' */
        })

        //console.log(registoCriado)

        response.json({
            dados: 'resposta em json',
            registroCriado: registroCriado,
        })
        return;
    }
    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })

}