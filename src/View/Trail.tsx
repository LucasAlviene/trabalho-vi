import { useState } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import Categorias from '../Component/Trail/Categorias'
import Timeline from '../Component/Trail/Timeline';
import simulationData from '../simulation.json'
import Estacoes from '../Component/Trail/Estacoes';
import Alunos from '../Component/Trail/Alunos';

function Trail({ id = "1" }: { id: string }) {
    const [selectedStation, setSelectedStation] = useState<number[]>([]);
    const [selectedAlunos, setSelectedAlunos] = useState<number[]>([]);

    const listSelected: Simulation[] = simulationData.reduce<Simulation[]>((current, item, user) => {
        const newItem = { ...item }
        newItem.stations = newItem.stations.filter((station, id) => selectedStation.includes(id))
        if (newItem.stations.length > 0) current.push(newItem);
        return current;
    }, [])

    return (
        <Container fluid style={{ marginTop: "3em", padding: "2em" }}>

            <Grid>
                <Grid.Column width={13}>
                    <Header as="h2" content={`Trilha ${id}`} />
                    <Timeline users={listSelected} selected={selectedAlunos} />
                    <Alunos data={listSelected} selected={selectedAlunos} setSelected={setSelectedAlunos} />
                </Grid.Column>
                <Grid.Column width={3}>
                    <Header content="Alunos" />
                    <Estacoes data={simulationData} selected={selectedStation} setSelected={setSelectedStation} />
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default Trail
