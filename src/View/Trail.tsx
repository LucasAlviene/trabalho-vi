import { useState } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import Alunos from '../Component/Alunos'
import Categorias from '../Component/Categorias'
import Timeline from '../Component/Timeline';
import simulationData from '../simulation.json'

function Trail({ id = "1" }: { id: string }) {
    const [selected, setSelected] = useState<number[]>([]);

    const listSelected = selected.map((id) => simulationData[id].stations[id]);
    return (
        <Container fluid style={{ marginTop: "3em", padding: "2em" }}>

            <Grid>
                <Grid.Column width={13}>
                    <Header as="h2" content={`Trilha ${id}`} />
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
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default Trail
