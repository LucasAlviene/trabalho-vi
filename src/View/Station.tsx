import { useState } from 'react'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import Alunos from '../Component/Station/Alunos'
import Categorias from '../Component/Station/Categorias'
import Timeline from '../Component/Station/Timeline';
import simulationData from '../simulation.json'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function Station({ id, go }: { id: string, go: (hash: string) => void }) {
    const [selected, setSelected] = useState<number[]>([]);

    const listSelected: Station[] = [];
    selected.map((user) => {
        listSelected[user] = simulationData[user].stations[parseInt(id)];
    });

    const dataChart: any = {
        labels: ['Aprovados', 'Reprovados'],
        datasets: [
            {
                label: 'Alunos',
                data: [listSelected.filter((item) => item.result).length, listSelected.filter((item) => !item.result).length],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }
        ]
    }


    return (
        <Container fluid style={{ marginTop: "3em", padding: "2em" }}>

            <Grid>
                <Grid.Column width={13}>
                    <Grid style={{ marginBottom: "1em" }}>
                        <Grid.Column width={8}>
                            <Header as="h2" content={`Estação ${Number(id) + 1}`} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button.Group floated='right'>
                                <Button content="Trilha 1" onClick={() => go("#trail-0")} />
                            </Button.Group>
                        </Grid.Column>
                    </Grid>
                    <Timeline list={listSelected} />

                    <Header content="Resultado" />
                    <Grid columns={4}>
                        <Grid.Column>
                            <Categorias title="Exames" list={listSelected} />
                        </Grid.Column>
                        <Grid.Column>
                            <Categorias title="Anamnese" list={listSelected} />
                        </Grid.Column>
                        <Grid.Column>
                            <Categorias title="Diagnóstico" list={listSelected} />
                        </Grid.Column>
                        <Grid.Column>
                            <Categorias title="Tratamento" list={listSelected} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={3}>
                    <Header content="Alunos" />
                    <Alunos data={simulationData} selected={selected} setSelected={setSelected} />
                    <br />
                    <br />
                    <Doughnut id='aprovados' data={dataChart} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default Station
