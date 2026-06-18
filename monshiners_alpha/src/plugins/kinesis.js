const passthrough = { name:'KinesisPassthrough', template:'<div><slot /></div>' }
export default { install(app){ app.component('KinesisContainer', passthrough); app.component('KinesisElement', passthrough) } }
export const KinesisContainer = passthrough
export const KinesisElement = passthrough
