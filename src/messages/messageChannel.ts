import { config } from 'dotenv'
import { Channel, connect } from 'amqplib'
config()

export const createMessageChannel = async (): Promise<Channel> => {
    try{
        const connection = await connect(process.env.AMQP_SERVER)
        const channel = await connection.createChannel()

        await channel.assertQueue(process.env.QUEUE_NAME)

        console.log('Connected with RabbitMQ')

        return channel
    }catch(err){
        console.log('Error while trying to connect to RabbitMQ')
        console.log(err)
        return null
    }
}