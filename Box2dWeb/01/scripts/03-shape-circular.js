window.onload = function () {
    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2World = Box2D.Dynamics.b2World;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

    var context = document.getElementById('gameCanvas')
                  .getContext('2d');

    var mundo;
    var escala = 30; // 30 pixels correspondem a 1 metro
    var gravidade;
    gravidade = new b2Vec2(0.0, 9.8); // 9.8 m/s^2

    // faz com que os objetos em repouso
    // sejam excluidos das contas
    mundo = new b2World(gravidade, true);

    criarPiso();
    criarCorpoRetangular();
    criarCorpoCircular();
    setupDebugDraw();
    animar();

    function setupDebugDraw()
    {
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(context);
        debugDraw.SetDrawScale(escala);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        // desenhar Shapes e Joints
        // Temos também: e_centerOfMassBit e _e_aabbBit (bounding boxes)
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

        mundo.SetDebugDraw(debugDraw);
    }

    function criarPiso()
    {
        var corpoDef = new b2BodyDef;
        // b2_staticBody
        // Se mantém no mesmo lugar e não é afetado
        // pela gravidade ou colisões.
        corpoDef.type = b2Body.b2_staticBody;

        // baseada no ponto de origem do objeto
        // neste caso definido a seguir com a função
        // SetAsBox
        corpoDef.position.x = 640 / 2 / escala;
        corpoDef.position.y = 450 / escala;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0; // usado para calcular o peso
        fixtureDef.friction = 0.5; // escorregar de forma realista
        fixtureDef.restitution = 0.2; // quicar (colisão elasticidade)

        fixtureDef.shape = new b2PolygonShape;
        // corpo está posicionado no centro em x
        // e 450 no y. A largura e a altura são desenhadas
        // para a esquerda e a direita, em cima e embaixo.
        fixtureDef.shape.SetAsBox(320 / escala, 10 / escala);

        var corpo = mundo.CreateBody(corpoDef);
        var fixture = corpo.CreateFixture(fixtureDef);

    }

    function criarCorpoRetangular()
    {
        var corpoDef = new b2BodyDef;
        // corpo é afetado pela gravidade e pela colisão
        corpoDef.type = b2Body.b2_dynamicBody;
        corpoDef.position.x = 40 / escala;
        corpoDef.position.y = 100 / escala;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.3;

        fixtureDef.shape = new b2PolygonShape;
        fixtureDef.shape.SetAsBox(30 / escala, 50 / escala);

        var corpo = mundo.CreateBody(corpoDef);
        var fixture = corpo.CreateFixture(fixtureDef);
    }

    function criarCorpoCircular()
    {
        var corpoDef = new b2BodyDef;
        corpoDef.type = b2Body.b2_dynamicBody;
        corpoDef.position.x = 130 / escala;
        corpoDef.position.y = 100 / escala;

        var fixtureDef = new b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.7;

        fixtureDef.shape = new b2CircleShape(30 / escala);

        var corpo = mundo.CreateBody(corpoDef);
        var fixture = corpo.CreateFixture(fixtureDef);
    }

    var fps = 1 / 60;

    // Box2d usa um algoritmo chamado `integrator` para simular
    // as equações física no de pontos discretos no tempo.
    // Além do integrator existe `constraint solver`.
    // Para obter uma boa simulação o algoritmo deve iterar
    // uma quantidade de vezes em todas as restrições.
    // Existem duas fases dentro do constraint solver:
    // fase da velocidade e fase da posição, cada fase tem
    // seu próprio contador de iterações.
    // Usar muitas iterações faz com que a simulação
    // seja mais precisa e torna o jogo mais lento.

    var velocidadeInteração = 8; // valores sugeridos
    var posiçãoInterações = 3;   // no livr box2d C++

    function animar()
    {
        // Rodar a simulação
        mundo.Step(fps,
                   velocidadeInteração,
                   posiçãoInterações);

        // Remover qualquer força que tenha sido aplicada
        // nos corpos
        mundo.ClearForces();
        
        // Desenhar os dados de depuração
        mundo.DrawDebugData();

        setTimeout(animar, fps);
    }



    



}