import React from 'react';
import Particles from 'react-particles-js';

const ParticleBackground = () => (
    <div id="particle-background">
        <Particles
            params={{
                particles: {
                    number: {
                        value: 50,
                    },
                    size: {
                        value: 3,
                    },
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse',
                        },
                    },
                },
            }}
        />
    </div>
);

export default ParticleBackground;
