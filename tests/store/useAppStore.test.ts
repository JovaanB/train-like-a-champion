import { useAppStore } from '../../stores/useAppStore'

describe('useAppStore', () => {
    it('should set user role', () => {
        useAppStore.getState().setUserRole('coach')
        expect(useAppStore.getState().userRole).toBe('coach')
    })
})
