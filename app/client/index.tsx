import { Box } from '@/components/ui/box'
import { useAppStore } from '../../stores/useAppStore'
import { VStack } from '@/components/ui/vstack'
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';

export default function ClientDashboard() {
    const userRole = useAppStore((state) => state.userRole);
    const router = useRouter();

    useEffect(() => {
        if (!userRole) router.replace('/')
    }, [userRole])

    return (
        <Box className='p-4'>
            <VStack space="md">
                <Text>Espace Client</Text>
                <Text>
                    Bienvenue {userRole === 'client' ? 'Client' : ''}
                </Text>
                <Text>
                    Suivez vos entraînements, enregistrez vos progrès et restez connecté avec votre coach.                </Text>
            </VStack>
        </Box>
    )
}