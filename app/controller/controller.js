module.exports.render = async function (app, req, res) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const url = "http://apiadvisor.climatempo.com.br/api/v1/weather/locale/5616/current?token=90b44b5ace3f28eebd306937d425a0b5"
  const result = await fetch(url, requestOptions)
  const tempoJson = await result.json()

  let dataAtual = new Date();
  const ano = dataAtual.getFullYear()
  const mes = dataAtual.getMonth() + 1
  const dia = dataAtual.getDate()
  const data = ano + "-" + mes + "-" + dia
  const hora = dataAtual.getHours()
  const dados = {
    temperatura: tempoJson.data.temperature,
    umidade: tempoJson.data.humidity,
    sensacao: tempoJson.data.sensation,
    vento: tempoJson.data.wind_velocity,
    condicao: tempoJson.data.condition,
    idCidade: tempoJson.id,
    cidade: tempoJson.name,
    estado: tempoJson.state,
    img: tempoJson.data.icon,
    data: data
  }

  if (hora == 7 || hora == 13 || hora == 22) {
    const conexao = app.config.conexao
    const model = new app.app.model.model(conexao)
    await model.cadastrar(dados.idCidade, dados.temperatura, dados.umidade, dados.sensacao, dados.vento, dados.condicao, dados.data)
  }
  res.render('previsao', { erros: {}, dados: dados })
}

module.exports.mostrarGrafico = async function (app, req, res) {
  const dados = req.body
  const conexao = app.config.conexao
  const model = new app.app.model.model(conexao)
  const idCidade = dados.idCidade
  const grafico = await model.mostrarGrafico(idCidade)
  res.render('grafico', { erros: {}, dados: grafico})
}
