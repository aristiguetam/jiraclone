
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: ' Pendiente: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non velit metus.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: ' En progreso: Sed vel est ut urna mollis lobortis sit amet volutpat dui. Phasellus sit amet leo efficitur,',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Terminadas: Nunc commodo nisl mauris. Cras commodo sollicitudin nunc ac accumsan. Donec tempus lacinia semper.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}