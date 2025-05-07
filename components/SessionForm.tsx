import { useState } from 'react'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { Input, InputField } from '@/components/ui/input'
import { Button } from './ui/button'
import { VStack } from './ui/vstack'
import { Alert } from 'react-native'
import { Exercise } from '@/stores/useSessionStore'
import { useSessionStore } from '@/stores/useSessionStore'

type SessionFormProps = {
    onSubmit: (data: { name: string; exercises: Exercise[] }) => void
}

export default function SessionForm({ onSubmit }: SessionFormProps) {
    const [sessionName, setSessionName] = useState('')
    const [exercises, setExercises] = useState<Exercise[]>([])

    const addSession = useSessionStore((state) => state.addSession)

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', reps: '', weight: '' }])
    }

    const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
        const updated = [...exercises]
        updated[index][field] = value
        setExercises(updated)
    }

    const handleSubmit = () => {
        if (!sessionName.trim()) {
            Alert.alert('Erreur', 'Le nom de la séance est requis')
            return
        }

        for (let i = 0; i < exercises.length; i++) {
            const { name, reps, weight } = exercises[i]
            if (!name.trim()) {
                Alert.alert('Erreur', `L’exercice ${i + 1} doit avoir un nom`)
                return
            }
            if (isNaN(Number(reps)) || Number(reps) <= 0) {
                Alert.alert('Erreur', `L’exercice ${i + 1} doit avoir un nombre de répétitions valide`)
                return
            }
            if (isNaN(Number(weight)) || Number(weight) < 0) {
                Alert.alert('Erreur', `L’exercice ${i + 1} doit avoir une charge valide`)
                return
            }
        }

        const preview = exercises.map((ex, i) =>
            `• ${ex.name} – ${ex.reps} reps – ${ex.weight} kg`
        ).join('\n')

        Alert.alert(
            'Confirmer la séance',
            `Nom : ${sessionName}\n\nExercices :\n${preview}`,
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Confirmer',
                    onPress: () => {
                        addSession({ name: sessionName, exercises })
                        Alert.alert('Succès', 'Séance enregistrée ✅')
                        setSessionName('')
                        setExercises([])
                    }
                },
            ]
        )
    }

    return (
        <Box>
            <VStack space='xl'>
                <Text size="2xl" bold>Créer une nouvelle séance</Text>

                <Input variant="outline" size="md">
                    <InputField
                        placeholder="Nom de la séance"
                        value={sessionName}
                        onChangeText={setSessionName}
                    />
                </Input>

                {exercises.map((ex, idx) => (
                    <Box key={idx}>
                        <VStack space='sm'>
                            <Input>
                                <InputField
                                    placeholder="Nom de l'exercice"
                                    value={ex.name}
                                    onChangeText={(val) => handleExerciseChange(idx, 'name', val)}
                                />
                            </Input>
                            <Input>
                                <InputField
                                    placeholder="Reps"
                                    value={ex.reps}
                                    onChangeText={(val) => handleExerciseChange(idx, 'reps', val)}
                                />
                            </Input>
                            <Input>
                                <InputField
                                    placeholder="Charge (KG)"
                                    value={ex.weight}
                                    onChangeText={(val) => handleExerciseChange(idx, 'weight', val)}
                                />
                            </Input>
                        </VStack>
                    </Box>
                ))}

                <Button onPress={handleAddExercise} variant="outline" action='secondary'>
                    <Text>Ajouter un exercice</Text>
                </Button>

                <Button onPress={handleSubmit} variant='outline' action='positive'>
                    <Text>Valider</Text>
                </Button>
            </VStack>
        </Box>
    )
}
