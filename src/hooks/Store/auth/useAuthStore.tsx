import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { UserState } from '@/src/hooks/Store/auth/state/UserState';
import { useUserSlice } from '@/src/hooks/Store/auth/Slices';

const useAuthStore = create<UserState>()(
  devtools(
    immer((...a) => ({
      ...useUserSlice(...a),
    })),
  ),
);

export default useAuthStore;
