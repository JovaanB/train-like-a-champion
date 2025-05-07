import "react-native-get-random-values"
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { Input, InputField } from '@/components/ui/input'
import { Button } from './ui/button'
import { VStack } from './ui/vstack'
import { Alert } from 'react-native'
import { Exercise, Session } from '@/stores/useSessionStore'

type SessionFormProps = {
    onSubmit: (data: Omit<Session, "createdAt, id"> | { name: string; exercises: Exercise[]; tags: string[]; }) => void
    initialData?: { name: string; exercises: Exercise[] }
}

export default function SessionForm({ onSubmit, initialData }: SessionFormProps) {
    const [sessionName, setSessionName] = useState(initialData?.name || '')
    const [tags, setTags] = useState<string[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || [])

    const handleAddExercise = () => {
        setExercises([...exercises, { id: uuidv4(), name: '', reps: '', weight: '' }])
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
                        onSubmit({ name: sessionName, exercises, tags })
                        Alert.alert('Succès', 'Séance enregistrée ✅')
                        setExercises([])
                        setSessionName("")
                        setTags([])
                    }
                },
            ]
        )
    }

    return (
        <Box>
            <VStack space='xl'>
                <Input variant="outline" size="md">
                    <InputField
                        placeholder="Nom de la séance"
                        value={sessionName}
                        onChangeText={setSessionName}
                    />
                </Input>

                <Input>
                    <InputField
                        placeholder="Tags (ex: force, cardio, débutant)"
                        value={tags.join(', ')}
                        onChangeText={(text) => setTags(text.split(',').map((t) => t.trim()))}
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

                <Button onPress={handleSubmit} variant='solid' action='positive'>
                    <Text className='text-white'>Valider</Text>
                </Button>
            </VStack>
        </Box>
    )
}
