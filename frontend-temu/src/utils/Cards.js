export const certificateCards = Object.values(
    import.meta.glob(
        '../assets/certificate-cards/*.{png,jpg,jpeg,webp,PNG,JPEG}',
        {
            eager: true,
            query: '?url',
            import: 'default',
        },
    ),
);

export const paymentCards = Object.values(
    import.meta.glob('../assets/payment-cards/*.{png,jpg,jpeg,webp,PNG,JPEG}', {
        eager: true,
        query: '?url',
        import: 'default',
    }),
);
