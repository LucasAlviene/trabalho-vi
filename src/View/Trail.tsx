import { useState } from 'react'
import { Button, Container, Grid, Header } from 'semantic-ui-react'
import Categorias from '../Component/Trail/Categorias'
import Timeline from '../Component/Trail/Timeline';
import simulationData from '../simulation.json'
import Estacoes from '../Component/Trail/Estacoes';
import Alunos from '../Component/Trail/Alunos';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function Trail({ id, go }: { id: string, go: (hash: string) => void }) {
    const [selectedStation, setSelectedStation] = useState<number[]>([]);
    const [selectedAlunos, setSelectedAlunos] = useState<number[]>([]);

    const listSelected: Simulation[] = simulationData.reduce<Simulation[]>((current, item, user) => {
        const newItem = { ...item }
        newItem.stations = newItem.stations.filter((station, id) => selectedStation.includes(id))
        if (newItem.stations.length > 0) current.push(newItem);
        return current;
    }, [])

    const dataChart: any = {
        labels: ['Aprovados', 'Reprovados'],
        datasets: [
            {
                label: 'Alunos',
                data: [listSelected.filter((item) => item.stations.filter((station) => station.result).flat().length > 0).length, listSelected.filter((item) => item.stations.filter((station) => !station.result).flat().length > 0).length],
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
                            <Header as="h2" content={`Trilha 1`} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button.Group floated='right'>
                                <Button content="Estação 1" onClick={() => go("#station-0")} />
                                <Button content="Estação 2" onClick={() => go("#station-1")} />
                            </Button.Group>
                        </Grid.Column>
                    </Grid>
                    <Timeline users={listSelected} selected={selectedAlunos} />
                    <Alunos data={listSelected} selected={selectedAlunos} setSelected={setSelectedAlunos} />
                </Grid.Column>
                <Grid.Column width={3}>
                    <Header content="Alunos" />
                    <Estacoes data={simulationData} selected={selectedStation} setSelected={setSelectedStation} />
                    <br />
                    <br />
                    <Doughnut id='aprovados' data={dataChart} options={{
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        }
                    }} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default Trail
