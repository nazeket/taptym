import {LoginCredentials, ProfileData, RegisterCredentials, Statement} from "@/utils/class.js";

export const state = {
    isLoading: false,
    loaders: {
        delete: false,
        isContentLoading: false,
        isContentDetailLoading: false,
        isChatLoading: false,
        isUserDataLoading: false,
    },
    LoginCredentials: {...new LoginCredentials()},
    RegisterCredentials: {...new RegisterCredentials()},
    tradeProductHeader: '',
    ProfileData: {...new ProfileData()},
    Statement: {...new Statement()},
    contents: [],
    createPanel: false,
    editPanel: false,
    city: [],
    tradeType: [
        {
            id: 1,
            name: 'Продаю',
            type: 'sell',
        },
        {
            id: 2,
            name: 'Покупаю',
            type: 'buy'
        }
    ],
    category: [],
    buy: {
        more: [],
        auto: [],
        services: [],
        quarter: [],
    },
    sell: {
        more: [],
        auto: [],
        services: [],
        quarter: [],
    },
    favorites: {
        more: [],
        auto: [],
        services: [],
        quarter: [],
    }
}