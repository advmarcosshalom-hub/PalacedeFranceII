import { Unit } from './types';

export const getNotificationTemplate = (
  tType: string,
  unit: Unit,
  occDateFormatted: string,
  advDateFormatted: string,
  desc: string,
  type: string
): string => {
  switch (tType) {
    case 'advertencia_barulho':
      return `Na qualidade de advogado constituído pelo Condomínio Palace de France II, venho, por meio desta, notificá-lo(a) formalmente acerca de infração às normas internas do condomínio, consistente na produção de ruídos excessivos provenientes da sua unidade autônoma (apto. ${unit.unit_number} – Bloco ${unit.block}), verificada em ${occDateFormatted}.

Conforme apurado pela administração condominial, foram gerados ruídos perturbadores do sossego dos demais moradores, ${desc || 'conforme relatado'}, em horário não permitido pelas normas do condomínio.

Importa esclarecer que não é necessária a aferição por decibelímetro para a configuração da perturbação do sossego. A perturbação é apurada de forma objetiva pela percepção auditiva dos moradores afetados e pelo relato da administração condominial, sendo suficiente a constatação de que o ruído ultrapassa os limites do razoável e afeta o descanso e o bem-estar dos vizinhos. Esse entendimento é amplamente reconhecido pela jurisprudência pátria, que prescinde de prova técnica para a caracterização da infração, bastando a comprovação do fato por qualquer meio admitido em direito.

Especificamente, a conduta verificada contraria os seguintes dispositivos do Regimento Interno do Condomínio:

CAPÍTULO II - DOS DEVERES

Art. 6º - Os moradores do Condomínio deverão guardar silêncio das 22:00 horas às 7:00 horas, evitando a produção de ruídos que possam perturbar o sossego e o bem estar dos outros moradores.

Art. 7º - O uso de rádios, aparelhos de som, aspirador de pó ou de qualquer instrumento doméstico deverá ser feito de modo a não perturbar os vizinhos, observando-se o horário fixado no art. 6º.

Além disso, a Convenção do Condomínio, Art. 7º, alínea "a", estabelece como dever dos condôminos:

CAPÍTULO III – DIREITOS E DEVERES

Art. 7º - São deveres dos condôminos:
(...)
a) guardar decoro e respeito no uso das coisas e partes comuns, bem como nas respectivas unidades autônomas, não alterando sua destinação, nem delas fazendo uso de forma nociva ou perigosa ao sossego, à salubridade e à segurança dos demais condôminos, ou capaz de causar dano ao prédio;

Diante do exposto, fica Vossa Senhoria advertido(a) para que doravante os(as) moradores(as) da unidade observem rigorosamente os limites de ruído estabelecidos neste regimento, especialmente o silêncio obrigatório das 22h às 7h, bem como o uso moderado de aparelhos e equipamentos sonoros em qualquer horário, de modo a não perturbar os vizinhos.

Relembramos que, conforme o Art. 58 do Regimento Interno, o desrespeito às disposições sujeita o infrator à advertência escrita. Na reincidência, será aplicada a penalidade de multa de um condomínio vigente e/ou na forma da lei.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'advertencia_roupas_varanda':
      return `Na qualidade de advogado constituído pelo Condomínio Palace de France II, venho, por meio desta, notificá-lo(a) formalmente acerca de infração às normas internas do condomínio, observada na varanda da sua unidade autônoma (${unit.unit_number}-${unit.block}).

Conforme apurado pela administração condominial, foi constatada a colocação de roupas estendidas em local visível do exterior, acima da mureta da varanda. Esta conduta é proibida, pois prejudica a estética da edificação e está em desacordo com o disposto no Regimento Interno e na Convenção do Condomínio.

Especificamente, esta ação configura um desrespeito às normas, nomeadamente o art. 19 do Regimento Interno:

CAPÍTULO III - DAS PROIBIÇÕES
Art. 19 - É expressamente proibido:
a) alterar a parte externa do Condomínio com cores e materiais diversos, ou com a instalação de objetos nas janelas e varandas, tais como roupas estendidas, que possam prejudicar a estrutura do edifício, estética, iluminação e ventilação das unidades;

Além disso, a Convenção do Condomínio, Art. 7º, alínea "c", estabelece:

CAPÍTULO III - DIREITOS E DEVERES
Art. 7º - São deveres dos condôminos:
(...)
c) não estender roupas, tapetes ou quaisquer objetos nas janelas ou em quaisquer lugares que sejam visíveis do exterior ou de onde estejam expostos ao risco de caírem;

Diante do exposto, fica Vossa Senhoria advertido(a) para que doravante os moradores observem rigorosamente o estabelecido nos dispositivos acima. Relembramos ainda que, conforme o Art. 58 do Regimento Interno, o desrespeito às disposições sujeita o infrator à advertência escrita. Na reincidência, será aplicada a penalidade de multa de um condomínio vigente e/ou na forma da lei.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'advertencia_objetos_corredor':
      return `Na qualidade de advogado constituído pelo Condomínio Palace de France II, venho, por meio desta, notificá-lo(a) formalmente acerca de infração às normas internas do condomínio, consistente na utilização da área comum adjacente à sua unidade (corredor/hall do pavimento) para o depósito e guarda de objetos pessoais.

A conduta descrita infringe diretamente o Regimento Interno do Condomínio, especificamente o art. 5º:

CAPÍTULO II - DOS DEVERES
Art. 5º - As entradas, passagens, corredores, escadas, halls, garagens e todas as demais partes comuns do CONDOMINIO PALACE DE FRANCE II não poderão ser utilizadas para qualquer serviço doméstico, depósito e guarda de qualquer material, utensílio ou objeto, sendo proibido o estacionamento de pessoas nestas partes comuns, quer a sós, quer em grupos.

O uso das áreas comuns para guarda de objetos pessoais obstrui a passagem, prejudica a limpeza e compromete a segurança em caso de necessidade de evacuação, além de ferir a estética do edifício.

Diante do exposto, fica Vossa Senhoria advertido(a) para que proceda à imediata retirada de quaisquer objetos das áreas comuns. Relembramos que, conforme o Art. 58 do Regimento Interno, o desrespeito às disposições sujeita o infrator à advertência escrita. Na reincidência, será aplicada a penalidade de multa de um condomínio vigente e/ou na forma da lei.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'advertencia_bicicletas':
      return `Na qualidade de advogado constituído pelo Condomínio Palace de France II, venho, por meio desta, notificá-lo(a) formalmente acerca de infração às normas internas do condomínio, consistente no trânsito de bicicletas em áreas comuns proibidas ou de forma inadequada, verificado em ${occDateFormatted}.

A conduta descrita infringe o Capítulo V, art. 25, alínea "d" do Regimento Interno:

CAPÍTULO V - DO USO DAS GARAGENS
Art. 25 - É vedado aos condôminos:
(...)
d) permitir a permanência de crianças, trânsito de bicicletas e jogo de bolas, bem como outros esportes ou brincadeiras infantis;

O trânsito de bicicletas em áreas de pedestres ou garagens fora das normas de segurança coloca em risco os demais moradores e pode causar danos ao patrimônio.

Diante do exposto, fica Vossa Senhoria advertido(a) para que observe rigorosamente as normas de trânsito e guarda de bicicletas. Relembramos que, conforme o Art. 58 do Regimento Interno, o desrespeito às disposições sujeita o infrator à advertência escrita. Na reincidência, será aplicada a penalidade de multa de um condomínio vigente e/ou na forma da lei.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'multa_barulho':
      return `Conforme advertência formal encaminhada em ${advDateFormatted}, referente à infração às normas internas do condomínio, especificamente a conduta de produção de ruídos excessivos provenientes da unidade autônoma (apto. ${unit.unit_number} – Bloco ${unit.block}), informamos que, novamente, a irregularidade foi verificada em ${occDateFormatted}, estando caracterizada a reincidência, o que autoriza a aplicação de penalidade pelo desrespeito às normas, nomeadamente os arts. 6º e 7º do Regimento Interno:

CAPÍTULO II - DOS DEVERES

Art. 6º - Os moradores do Condomínio deverão guardar silêncio das 22:00 horas às 7:00 horas, evitando a produção de ruídos que possam perturbar o sossego e o bem estar dos outros moradores.

Art. 7º - O uso de rádios, aparelhos de som, aspirador de pó ou de qualquer instrumento doméstico deverá ser feito de modo a não perturbar os vizinhos, observando-se o horário fixado no art. 6º.

Destarte, diante da repetição da conduta irregular após advertência, resta caracterizada a reincidência, o que autoriza a aplicação de penalidade. Assim, fica V.Sa. notificada da aplicação de multa correspondente a 1 (uma) cota condominial vigente, que será lançada no próximo boleto de condomínio.

Vejamos o que diz o Regimento Interno, onde está prevista a imposição de multa:

Art. 58 - Fica estabelecido que quando desrespeitadas as disposições do presente Regimento será feita advertência escrita e na reincidência será aplicada multa de um condomínio vigente e/ou na forma da lei.

Art. 64 - O proprietário responde solidariamente pelas obrigações dos seus locatários e/ou cessionários.

A imposição de multa é também prevista na Convenção Condominial, conforme trechos abaixo transcritos:

Art. 35° - Além das penas cominadas em lei, fica ainda o condômino que, transitória ou eventualmente, perturbar o uso das coisas comuns, violar qualquer dos deveres estipulados nesta convenção ou der causa a despesas, sujeito à multa, conforme estabelecido no art. 34 desta convenção.

Parágrafo Único – A multa será imposta e cobrada pelo síndico, em nome do condômino, caso seja interposto, com recursos do interessado para a assembleia geral.

Reforçamos que caso sejam verificadas novas infrações da mesma espécie, podem ser aplicadas novas penalidades pela reincidência.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'multa_bicicletas':
      return `Conforme advertência formal encaminhada em ${advDateFormatted}, referente à infração às normas internas do condomínio, especificamente a conduta de permitir o trânsito de bicicletas nas áreas comuns do condomínio em desacordo com o Regimento Interno, informamos que, novamente, a irregularidade foi verificada em ${occDateFormatted}, estando caracterizada a reincidência, o que autoriza a aplicação de penalidade pelo desrespeito às normas, nomeadamente o Capítulo V, art. 25, alínea "d" do Regimento Interno:

CAPÍTULO V - DO USO DAS GARAGENS

Art. 25 - É vedado aos condôminos:
(...)
d) permitir a permanência de crianças, trânsito de bicicletas e jogo de bolas, bem como outros esportes ou brincadeiras infantis;

Além disso, a Convenção do Condomínio, Art. 7º, alínea "a", estabelece como dever dos condôminos: "guardar decoro e respeito no uso das coisas e partes comuns, bem como nas respectivas unidades autônomas, não alterando sua destinação, nem delas fazendo uso de forma nociva ou perigosa ao sossego, à salubridade e à segurança dos demais condôminos, ou capaz de causar dano ao prédio".

Destarte, diante da repetição da conduta irregular após advertência, resta caracterizada a reincidência, o que autoriza a aplicação de penalidade. Assim, fica V.Sa. notificada da aplicação de multa correspondente a 1 (uma) cota condominial vigente, que será lançada no próximo boleto de condomínio.

Vejamos o que diz o Regimento Interno, onde está prevista a imposição de multa:

Art. 58 - Fica estabelecido que quando desrespeitadas as disposições do presente Regimento será feita advertência escrita e na reincidência será aplicada multa de um condomínio vigente e/ou na forma da lei.

Art. 64 - O proprietário responde solidariamente pelas obrigações dos seus locatários e/ou cessionários.

A imposição de multa é também prevista na Convenção Condominial, conforme trechos abaixo transcritos:

Art. 35° - Além das penas cominadas em lei, fica ainda o condômino que, transitória ou eventualmente, perturbar o uso das coisas comuns, violar qualquer dos deveres estipulados nesta convenção ou der causa a despesas, sujeito à multa, conforme estabelecido no art. 34 desta convenção.

Parágrafo Único – A multa será imposta e cobrada pelo síndico, em nome do condômino, caso seja interposto, com recursos do interessado para a assembleia geral.

Reforçamos que caso sejam verificadas novas infrações da mesma espécie, podem ser aplicadas novas penalidades pela reincidência.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'multa_estacionamento':
      return `Conforme advertência formal encaminhada em ${advDateFormatted}, referente à infração às normas condominiais de uso da garagem, informamos que, novamente, a irregularidade foi verificada em ${occDateFormatted}, estando caracterizada a reincidência, o que autoriza a aplicação de penalidade pelo desrespeito às normas, nomeadamente os arts. 23 e 25 do Regimento Interno:

CAPÍTULO V - DO USO DAS GARAGENS

Art. 23 - As vagas de estacionamento são previamente demarcadas por unidade e para uso e veículos de porte médio dos condôminos, dentro da faixa amarela. Todos os veículos dos condôminos devem ter sua placa registrada na portaria e possuir o adesivo de acesso ao edifício.

Art. 25 - É vedado aos condôminos:
(...)
b) estacionar impedindo ou dificultando as manobras de entrada e saída de carros;

Além disso, a Convenção do Condomínio, Art. 7º, alínea "a", que estabelece como dever dos condôminos: "guardar decoro e respeito no uso das coisas e partes comuns, bem como nas respectivas unidades autônomas, não alterando sua destinação, nem delas fazendo uso de forma nociva ou perigosa ao sossego, à salubridade e à segurança dos demais condôminos, ou capaz de causar dano ao prédio".

Destarte, diante da repetição da conduta irregular após advertência, resta caracterizada a reincidência, o que autoriza a aplicação de penalidade. Assim, fica V.Sa. notificada da aplicação de multa correspondente a 1 (uma) cota condominial vigente, que será lançada no próximo boleto de condomínio.

Vejamos o que diz o Regimento Interno, onde está prevista a imposição de multa:

Art. 58 - Fica estabelecido que quando desrespeitadas as disposições do presente Regimento será feita advertência escrita e na reincidência será aplicada multa de um condomínio vigente e/ou na forma da lei.

Art. 64 - O proprietário responde solidariamente pelas obrigações dos seus locatários e/ou cessionários.

A imposição de multa é também prevista na Convenção Condominial, conforme trechos abaixo transcritos:

Art. 35° - Além das penas cominadas em lei, fica ainda o condômino que, transitória ou eventualmente, perturbar o uso das coisas comuns, violar qualquer dos deveres estipulados nesta convenção ou der causa a despesas, sujeito à multa, conforme estabelecido no art. 34 desta convenção.

Parágrafo Único – A multa será imposta e cobrada pelo síndico, em nome do condômino, caso seja interposto, com recursos do interessado para a assembleia geral.

Reforçamos que caso sejam verificadas novas infrações da mesma espécie, podem ser aplicadas novas penalidades pela reincidência.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'multa_gramada':
      return `Conforme advertência formal encaminhada em ${advDateFormatted}, referente à infração às normas internas do condomínio, especificamente a conduta de permitir a permanência de animal de estimação (cão) em área gramada restrita, informamos que, novamente, a irregularidade foi verificada em ${occDateFormatted}, estando caracterizada a reincidência, o que autoriza a aplicação de penalidade pelo desrespeito às normas, nomeadamente o Capítulo III, art. 19, alínea "l" do Regimento Interno:

CAPÍTULO III - DAS PROIBIÇÕES

Art. 19 - É expressamente proibido:
(...)
l) transitar com cães ou animais de estimação de qualquer porte nas áreas gramadas (playground, campo) e áreas internas comuns do condomínio (hall, escadas, corredores e etc.). Somente passear com animais de estimação fora das dependências do condomínio.;

Além disso, a Convenção do Condomínio, Art. 7º, alínea "a", que estabelece como dever dos condôminos: "guardar decoro e respeito no uso das coisas e partes comuns, bem como nas respectivas unidades autônomas, não alterando sua destinação, nem delas fazendo uso de forma nociva ou perigosa ao sossego, à salubridade e à segurança dos demais condôminos, ou capaz de causar dano ao prédio".

O uso do playground (parquinho) é destinado exclusivamente ao lazer infantil, e a presença de animais no gramado compromete a salubridade do local frequentado por crianças.

Destarte, diante da repetição da conduta irregular após advertência, resta caracterizada a reincidência, o que autoriza a aplicação de penalidade. Assim, fica V.Sa. notificada da aplicação de multa correspondente a 1 (uma) cota condominial vigente, que será lançada no próximo boleto de condomínio.

Vejamos o que diz o Regimento Interno, onde está prevista a imposição de multa:

Art. 58 - Fica estabelecido que quando desrespeitadas as disposições do presente Regimento será feita advertência escrita e na reincidência será aplicada multa de um condomínio vigente e/ou na forma da lei.

Art. 64 - O proprietário responde solidariamente pelas obrigações dos seus locatários e/ou cessionários.

A imposição de multa é também prevista na Convenção Condominial, conforme trechos abaixo transcritos:

Art. 35° - Além das penas cominadas em lei, fica ainda o condômino que, transitória ou eventualmente, perturbar o uso das coisas comuns, violar qualquer dos deveres estipulados nesta convenção ou der causa a despesas, sujeito à multa, conforme estabelecido no art. 34 desta convenção.

Parágrafo Único – A multa será imposta e cobrada pelo síndico, em nome do condômino, caso seja interposto, com recursos do interessado para a assembleia geral.

Reforçamos que caso sejam verificadas novas infrações da mesma espécie, podem ser aplicadas novas penalidades pela reincidência.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'multa_objetos_corredor':
      return `Conforme advertência formal encaminhada em ${advDateFormatted}, referente à infração às normas internas do condomínio, especificamente a conduta de utilizar a área comum adjacente à sua unidade (corredor/hall do pavimento) para o depósito e guarda de objetos pessoais, informamos que, novamente, a irregularidade foi verificada, estando caracterizada a reincidência, o que autoriza a aplicação de penalidade pelo desrespeito às normas, nomeadamente o art. 19 do Regimento Interno:

CAPÍTULO II - DOS DEVERES
Art. 5º - As entradas, passagens, corredores, escadas, halls, garagens e todas as demais partes comuns do CONDOMINIO PALACE DE FRANCE II não poderão ser utilizadas para qualquer serviço doméstico, depósito e guarda de qualquer material, utensílio ou objeto, sendo proibido o estacionamento de pessoas nestas partes comuns, quer a sós, quer em grupos.

Destarte, diante da repetição da conduta irregular após advertência, resta caracterizada a reincidência, o que autoriza a aplicação de penalidade. Assim, fica V.Sa. notificada da aplicação de multa correspondente a 1 (uma) cota condominial vigente, que será lançada no próximo boleto de condomínio.

Vejamos o que diz o Regimento Interno, onde está prevista a imposição de multa:
Art. 58 - Fica estabelecido que quando desrespeitadas as disposições do presente Regimento será feita advertência escrita e na reincidência será aplicada multa de um condomínio vigente e/ou na forma da lei.
Art. 64 - O proprietário responde solidariamente pelas obrigações dos seus locatários e/ou cessionários.

A imposição de multa é também prevista na Convenção Condominial, conforme trechos abaixo transcritos:
Art. 35º - Além das penas cominadas em lei, fica ainda o condômino que, transitória ou eventualmente, perturbar o uso das coisas comuns, violar qualquer dos deveres estipulados nesta convenção ou der causa a despesas, sujeito à multa, conforme estabelecido no art. 34 desta convenção.
Parágrafo Único – A multa será imposta e cobrada pelo síndico, em nome do condômino, caso seja interposto, com recursos do interessado para a assembleia geral.

Reforçamos que caso sejam verificadas novas infrações da mesma espécie, podem ser aplicadas novas penalidades pela reincidência.`;

    case 'multa_roupas_varanda':
      return `Conforme advertência formal encaminhada em ${advDateFormatted}, referente à infração às normas internas do condomínio, observada na varanda da sua unidade autônoma (${unit.unit_number}-${unit.block}), informamos que, novamente, a irregularidade foi verificada, estando caracterizada a reincidência, o que autoriza a aplicação de penalidade pelo desrespeito às normas, nomeadamente o art. 19 do Regimento Interno:

CAPÍTULO III - DAS PROIBIÇÕES
Art. 19 - É expressamente proibido:
a) alterar a parte externa do Condomínio com cores e materiais diversos, ou com a instalação de objetos nas janelas e varandas, tais como roupas estendidas, que possam prejudicar a estrutura do edifício, estética, iluminação e ventilação das unidades;

Além da advertência anterior, o assunto foi amplamente divulgado em circular interna enviada a cada unidade. Por oportuno, vejamos o contido na Convenção do Condomínio, que no art. 7º, alínea "c", estabelece:

CAPÍTULO III - DIREITOS E DEVERES
Art. 7º - São deveres dos condôminos:
(...)
c) não estender roupas, tapetes ou quaisquer objetos nas janelas ou em quaisquer lugares que sejam visíveis do exterior ou de onde estejam expostos ao risco de caírem;

Destarte, diante da manutenção da irregularidade após advertência, resta caracterizada a reincidência, o que autoriza a aplicação de penalidade. Assim, fica V.Sa. notificada da aplicação de multa correspondente a 1 (uma) cota condominial vigente, que será lançada no próximo boleto de condomínio.

Vejamos o que diz o Regimento Interno, onde está prevista a imposição de multa:
Art. 58 - Fica estabelecido que quando desrespeitadas as disposições do presente Regimento será feita advertência escrita e na reincidência será aplicada multa de um condomínio vigente e/ou na forma da lei.
Art. 64 - O proprietário responde solidariamente pelas obrigações dos seus locatários e/ou cessionários.

A imposição de multa é também prevista na Convenção Condominial, conforme trechos abaixo transcritos:
Art. 35º - Além das penas cominadas em lei, fica ainda o condômino que, transitória ou eventualmente, perturbar o uso das coisas comuns, violar qualquer dos deveres estipulados nesta convenção ou der causa a despesas, sujeito à multa, conforme estabelecido no art. 34 desta convenção.
Parágrafo Único – A multa será imposta e cobrada pelo síndico, em nome do condômino, caso seja interposto, com recursos do interessado para a assembleia geral.

Reforçamos que caso sejam verificadas novas infrações da mesma espécie, podem ser aplicadas novas penalidades pela reincidência.`;

    case 'advertencia_gramada':
      return `Na qualidade de advogado constituído pelo Condomínio Palace de France II, venho, por meio desta, notificá-la formalmente acerca de uma infração às normas condominiais, registrada pela administração, referente à presença de animal de estimação (cão) em área gramada restrita.

Conforme apurado, no dia ${occDateFormatted}, foi constatada a permanência de um cão pertencente à sua unidade na área gramada do parquinho (playground). Ressaltamos que esta conduta ocorreu mesmo após a entrega e ciência da Circular 002/2025 a todos os moradores, documento este que reforçava expressamente a orientação sobre tal proibição.

A conduta descrita infringe diretamente o Regimento Interno do Condomínio, que estabelece normas rigorosas para a preservação da higiene, segurança e ordem das áreas comuns:

CAPÍTULO III - DAS PROIBIÇÕES
Art. 19 - É expressamente proibido:
(...)
l) transitar com cães ou animais de estimação de qualquer porte nas áreas gramadas (playground, campo) e áreas internas comuns do condomínio (hall, escadas, corredores e etc.). Somente passear com animais de estimação fora das dependências do condomínio.;

Além disso, a Convenção do Condomínio, Art. 7º, alínea "a", que estabelece como dever dos condôminos: "guardar decoro e respeito no uso das coisas e partes comuns, bem como nas respectivas unidades autônomas, não alterando sua destinação, nem delas fazendo uso de forma nociva ou perigosa ao sossego, à salubridade e à segurança dos demais condôminos, ou capaz de causar dano ao prédio".

O uso do playground (parquinho) é destinado exclusivamente ao lazer infantil, e a presença de animais no gramado compromete a salubridade do local frequentado por crianças.

Diante do exposto, fica Vossa Senhoria advertida para que doravante, o morador observe rigorosamente o disposto no Regimento Interno, no citado artigo. Relembramos ainda que, conforme o Art. 58 do Regimento Interno, o desrespeito às disposições sujeita o infrator à advertência escrita. Na reincidência, será aplicada a penalidade de multa de um condomínio vigente e/ou na forma da lei.`;

    case 'advertencia_dejetos':
      return `Na qualidade de advogado constituído pelo Condomínio Palace de France II, venho, por meio desta, notificá-lo(a) formalmente acerca de infração às normas internas do condomínio, consistente na conduta de permitir que animal de estimação sob sua responsabilidade realize dejetos nas áreas comuns do condomínio sem a devida limpeza imediata, verificado em ${occDateFormatted}.

A conduta descrita infringe o Capítulo III, art. 19, alínea "l" do Regimento Interno:

CAPÍTULO III - DAS PROIBIÇÕES
Art. 19 - É expressamente proibido:
(...)
l) transitar com cães ou animais de estimação de qualquer porte nas áreas gramadas (playground, campo) e áreas internas comuns do condomínio (hall, escadas, corredores e etc.). Somente passear com animais de estimação fora das dependências do condomínio.;

A manutenção da higiene e salubridade das áreas comuns é dever de todos os moradores. A presença de dejetos animais em áreas de circulação ou lazer compromete o bem-estar e a saúde da coletividade.

Diante do exposto, fica Vossa Senhoria advertido(a) para que doravante observe rigorosamente as normas de higiene e circulação de animais. Relembramos que, conforme o Art. 58 do Regimento Interno, o desrespeito às disposições sujeita o infrator à advertência escrita. Na reincidência, será aplicada a penalidade de multa de um condomínio vigente e/ou na forma da lei.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'multa_dejetos':
      return `Conforme advertência formal encaminhada em ${advDateFormatted}, referente à infração às normas internas do condomínio, especificamente a conduta de permitir que animal de estimação sob sua responsabilidade realize dejetos nas áreas comuns do condomínio sem a devida limpeza imediata, informamos que a irregularidade foi novamente verificada em ${occDateFormatted}.

A conduta infringe o Regimento Interno, Capítulo III, art. 19, alínea "l":

CAPÍTULO III - DAS PROIBIÇÕES
Art. 19 - É expressamente proibido:
(...)
l) transitar com cães ou animais de estimação de qualquer porte nas áreas gramadas (playground, campo) e áreas internas comuns do condomínio (hall, escadas, corredores e etc.). Somente passear com animais de estimação fora das dependências do condomínio.;

Destarte, diante da repetição da conduta irregular após advertência, resta caracterizada a reincidência, o que autoriza a aplicação de penalidade. Assim, fica V.Sa. notificada da aplicação de multa correspondente a 1 (uma) cota condominial vigente, que será lançada no próximo boleto de condomínio.

Vejamos o que diz o Regimento Interno, onde está prevista a imposição de multa:
Art. 58 - Fica estabelecido que quando desrespeitadas as disposições do presente Regimento será feita advertência escrita e na reincidência será aplicada multa de um condomínio vigente e/ou na forma da lei.
Art. 64 - O proprietário responde solidariamente pelas obrigações dos seus locatários e/ou cessionários.

A imposição de multa é também prevista na Convenção Condominial, conforme trechos abaixo transcritos:
Art. 35º - Além das penas cominadas em lei, fica ainda o condômino que, transitória ou eventualmente, perturbar o uso das coisas comuns, violar qualquer dos deveres estipulados nesta convenção ou der causa a despesas, sujeito à multa, conforme estabelecido no art. 34 desta convenção.
Parágrafo Único – A multa será imposta e cobrada pelo síndico, em nome do condômino, caso seja interposto, com recursos do interessado para a assembleia geral.

Reforçamos que caso sejam verificadas novas infrações da mesma espécie, podem ser aplicadas novas penalidades pela reincidência.

Este escritório de advocacia e a administração do condomínio colocam-se à disposição para quaisquer esclarecimentos adicionais e, desde já, agradecemos pela atenção e cooperação no sentido de manter a ordem e a boa convivência.`;

    case 'advertencia_estacionamento':
      return `Na qualidade de advogado constituído pelo Condomínio Palace de France II, venho, por meio desta, notificá-lo formalmente acerca de uma infração às normas condominiais de uso da garagem, ocorrida em ${occDateFormatted}.

Conforme apurado pela administração, o veículo vinculado à sua unidade foi estacionado de forma irregular, ocupando o espaço destinado a outras vagas e desrespeitando as delimitações existentes.

A conduta descrita infringe diretamente o Regimento Interno do Condomínio:

CAPÍTULO V - DO USO DAS GARAGENS
Art. 23 - As vagas de estacionamento são previamente demarcadas por unidade e seu uso e veículos de porte médio dos condôminos, dentro da faixa amarela. Todos os veículos dos condôminos devem ter sua placa registrada na portaria e possuir o adesivo de acesso ao edifício.

E ainda, no mesmo capítulo:
Art. 25 - É vedado aos condôminos:
b) estacionar impedindo ou dificultando as manobras de entrada e saída de carros;

Além disso, a Convenção do Condomínio, Art. 7º, alínea "a", que estabelece como dever dos condôminos: "guardar decoro e respeito no uso das coisas e partes comuns, bem como nas respectivas unidades autônomas, não alterando sua destinação, nem delas fazendo uso de forma nociva ou perigosa ao sossego, à salubridade e à segurança dos demais condôminos, ou capaz de causar dano ao prédio".

O descumprimento dessas regras prejudica o direito de uso dos demais condôminos e a organização do espaço coletivo de garagem.

Diante do exposto, fica Vossa Senhoria advertida para que doravante, o morador estacione seu veículo exclusivamente dentro dos limites da vaga correspondente à sua unidade. Relembramos ainda que, conforme o Art. 58 do Regimento Interno, o desrespeito às disposições sujeita o infrator à advertência escrita. Na reincidência, será aplicada a penalidade de multa de um condomínio vigente e/ou na forma da lei.`;

    case 'multa':
      return `Prezado(a), verificamos a reincidência na infração referente a "${type}", ocorrida em ${occDateFormatted}. Conforme as normas do condomínio e o Regulamento Interno, esta unidade está sendo penalizada com MULTA pecuniária, a ser incluída no próximo boleto de condomínio.`;
    case 'advertencia':
      return `Prezado(a), verificamos uma infração às normas condominiais referente a "${type}", ocorrida em ${occDateFormatted}. Esta serve como uma ADVERTÊNCIA formal para que a situação seja regularizada imediatamente, evitando a aplicação de multas futuras em caso de reincidência.`;
    default:
      return `Prezado(a), servimo-nos da presente para notificá-lo(a) acerca da seguinte ocorrência: "${type}", em ${occDateFormatted}. Solicitamos sua atenção para o cumprimento das normas de convivência do Condomínio Palace de France II.`;
  }
};
