module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`Bot Aktif`)

        setInterval(function () {
            client.user.setActivity(`/gpt • /resim`)
        }, 30000)
    }
}
