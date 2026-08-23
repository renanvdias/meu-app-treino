export const workoutPlan = {
  A: {
    id: 'A',
    title: 'Upper (Membros Superiores)',
    exercises: [
      { id: 'a1', name: 'Supino Inclinado com Halteres', sets: 3, reps: '8-10', weight: 0, done: false, notes: 'Banco a 30°. Costas totalmente estabilizadas.' },
      { id: 'a2', name: 'Remada Apoiada no Banco', sets: 3, reps: '8-10', weight: 0, done: false, notes: 'Peito no banco. Zero estresse na lombar.' },
      { id: 'a3', name: 'Puxada Alta (Frente)', sets: 3, reps: '10-12', weight: 0, done: false, notes: 'Manter tronco firme.' },
      { id: 'a4', name: 'Elevação Lateral Sentado', sets: 3, reps: '12-15', weight: 0, done: false, notes: 'Sentado para evitar impulsos na coluna.' },
      { id: 'a5', name: 'Tríceps Polia + Rosca Martelo', sets: 3, reps: '10-12', weight: 0, done: false, notes: 'Fazer em bi-set.' }
    ]
  },
  B: {
    id: 'B',
    title: 'Lower 1 (Foco em Quadríceps)',
    exercises: [
      { id: 'b1', name: 'Agachamento Búlgaro', sets: 3, reps: '8-10', weight: 0, done: false, notes: 'Com halteres. Menos peso total nas costas.' },
      { id: 'b2', name: 'Leg Press 45°', sets: 3, reps: '10-12', weight: 0, done: false, notes: 'Descer só até o limite do quadril.' },
      { id: 'b3', name: 'Cadeira Extensora', sets: 4, reps: '12-15', weight: 0, done: false, notes: 'Segurar 1 seg no pico de contração.' },
      { id: 'b4', name: 'Panturrilha no Leg Press', sets: 4, reps: '15-20', weight: 0, done: false, notes: 'Joelhos levemente destravados.' },
      { id: 'b5', name: 'Prancha Frontal', sets: 3, reps: '45-60s', weight: 0, done: false, notes: 'Estabilização isométrica.' }
    ]
  },
  C: {
    id: 'C',
    title: 'Push (Peito, Ombro e Tríceps)',
    exercises: [
      { id: 'c1', name: 'Supino Reto na Máquina', sets: 3, reps: '8-10', weight: 0, done: false, notes: 'A máquina oferece controle e evita torções do tronco.' },
      { id: 'c2', name: 'Crossover Polia Alta', sets: 3, reps: '12-15', weight: 0, done: false, notes: 'Foco no alongamento e contração do peitoral.' },
      { id: 'c3', name: 'Desenvolvimento Sentado', sets: 3, reps: '8-10', weight: 0, done: false, notes: 'Banco a 90° apoiando as costas com halteres.' },
      { id: 'c4', name: 'Tríceps Corda', sets: 3, reps: '12-15', weight: 0, done: false, notes: 'Mantenha os cotovelos colados ao tronco.' },
      { id: 'c5', name: 'Abdominal Dead Bug', sets: 3, reps: '10', weight: 0, done: false, notes: 'Fortalece o core sem promover flexão da coluna.' }
    ]
  },
  D: {
    id: 'D',
    title: 'Pull (Costas, Bíceps e Posterior de Ombro)',
    exercises: [
      { id: 'd1', name: 'Puxada com Triângulo', sets: 3, reps: '8-10', weight: 0, done: false, notes: 'Tronco levemente inclinado para trás, estufando o peito.' },
      { id: 'd2', name: 'Remada Unilateral (Serrote)', sets: 3, reps: '8-10', weight: 0, done: false, notes: 'Apoie mão e joelho firmemente no banco.' },
      { id: 'd3', name: 'Crucifixo Invertido na Máquina', sets: 3, reps: '12-15', weight: 0, done: false, notes: 'Foco na parte de trás do ombro e postura.' },
      { id: 'd4', name: 'Rosca Direta no Cabo', sets: 3, reps: '10-12', weight: 0, done: false, notes: 'Polia baixa. Tensão constante ajuda na hipertrofia.' },
      { id: 'd5', name: 'Bird-Dog (Perdigueiro)', sets: 3, reps: '10', weight: 0, done: false, notes: 'Exercício de solo excelente para a saúde lombar.' }
    ]
  },
  E: {
    id: 'E',
    title: 'Pernas (Posterior/Glúteo) + Parque',
    exercises: [
      { id: 'e1', name: 'Cadeira Flexora', sets: 4, reps: '10-12', weight: 0, done: false, notes: 'Foco total na parte de trás da coxa (isquiotibiais).' },
      { id: 'e2', name: 'Mesa Flexora', sets: 3, reps: '10-12', weight: 0, done: false, notes: 'Controle bem a descida do peso para evitar trancos.' },
      { id: 'e3', name: 'Elevação Pélvica', sets: 3, reps: '10-12', weight: 0, done: false, notes: 'Solo ou máquina. Contrai os glúteos no topo.' },
      { id: 'e4', name: 'Panturrilha Sentado (Máquina)', sets: 4, reps: '15-20', weight: 0, done: false, notes: 'Alongue bem no final do movimento.' },
      { id: 'e5', name: 'Cardio no Parque', sets: 1, reps: '25-30m', weight: 0, done: false, notes: 'Caminhada rápida ou trote leve no parque.' }
    ]
  }
};