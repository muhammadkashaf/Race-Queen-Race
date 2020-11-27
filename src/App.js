import "./App.css";
import useWebAnimations from "@wellyshen/use-web-animations";
import { useEffect } from "react";
import bush from './images/bush.png';
import bush_small from './images/bush_small.png';
import palm1 from './images/palm1.png';
import palm1_small from './images/palm1_small.png';
import palm2 from './images/palm2.png';
import palm2_small from './images/palm2_small.png';
import palm3 from './images/palm3.png';
import palm3_small from './images/palm3_small.png';
import r_knight from './images/r_knight.png';
import r_knight_small from './images/r_knight_small.png';
import r_pawn from './images/r_pawn.png';
import r_pawn_small from './images/r_pawn_small.png';
import r_pawn_upright from './images/r_pawn_upright.png';
import r_pawn_upright_small from './images/r_pawn_upright_small.png';
import sprite_running from './images/sprite_running-alice-queen.png';
import w_rook from './images/w_rook.png';
import w_rook_small from './images/w_rook_small.png';
import w_rook_upright from './images/w_rook_upright.png';
import w_rook_upright_small from './images/w_rook_upright_small.png';

function App() {
	
	let sceneryFrames = [
		{ transform: "translateX(100%)" },
		{ transform: "translateX(-100%)" },
	];

	let sceneryTimingBackground = {
		duration: 36000,
		iterations: Infinity,
	};

	let sceneryTimingForeground = {
		duration: 12000,
		iterations: Infinity,
	};

	const background1Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingBackground,
	});

	const background2Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingBackground,
	});

	const foreground1Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingForeground,
	});

	const foreground2Movement = useWebAnimations({
		keyframes: sceneryFrames,
		timing: sceneryTimingForeground,
	});

	const spriteFrames = [
		{ transform: "translateY(0)" },
		{ transform: "translateY(-100%)" },
	];
	const spriteTiming = {
		easing: "steps(7, end)",
		direction: "reverse",
		duration: 600,
		playbackRate: 1,
		iterations: Infinity,
	};
	const redQueen_alice = useWebAnimations({
		keyframes: spriteFrames,
		timing: spriteTiming,
	});

	let sceneries = [
		foreground1Movement,
		foreground2Movement,
		background1Movement,
		background2Movement,
	];

	let adjustBackgroundPlayback = function () {

		const redQueen_alice_play_backrate = redQueen_alice.getAnimation().playbackRate;

		if (redQueen_alice_play_backrate < 0.8) {
			sceneries.forEach(function ({ getAnimation }) {				
				getAnimation().updatePlaybackRate( (redQueen_alice_play_backrate/2) * -1 );
			});
		} else if (redQueen_alice_play_backrate > 1.2) {
			sceneries.forEach(function ({ getAnimation }) {
				getAnimation().updatePlaybackRate( redQueen_alice_play_backrate/2 );
			});
		} else {
			sceneries.forEach(function ({ getAnimation }) {
				getAnimation().updatePlaybackRate(0);
			});
		}
	};

	useEffect(() => {
		
		background1Movement.getAnimation().currentTime =
		background1Movement.getAnimation().effect.getTiming().duration / 2;
		foreground1Movement.getAnimation().currentTime =
		foreground1Movement.getAnimation().effect.getTiming().duration / 2;

		adjustBackgroundPlayback();

		setInterval( function() {

			const redQueen_alice_animation = redQueen_alice.getAnimation();
		
			if (redQueen_alice_animation.playbackRate > .4) {
				const newPlayback = redQueen_alice_animation.playbackRate * .9;
				redQueen_alice_animation.updatePlaybackRate(newPlayback);
			} 
			adjustBackgroundPlayback();

		}, 3000);

	}, []) // eslint-disable-line react-hooks/exhaustive-deps


	function goFaster() {
		const redQueen_alice_animation = redQueen_alice.getAnimation();
		const newPlayback = redQueen_alice_animation.playbackRate * 1.1;
		redQueen_alice_animation.updatePlaybackRate(newPlayback);
		adjustBackgroundPlayback();
	}

	return (
		<div onClick={goFaster}>
			<div className="wrapper">
				<div className="sky"></div>
				<div className="earth">
					<div id="red-queen_and_alice">
						<img
							id="red-queen_and_alice_sprite"
							src=""
							srcSet={`${sprite_running} 2x`}
							alt="Alice and the Red Queen running to stay in place."
							ref={redQueen_alice.ref}
						/>
					</div>
				</div>

				<div
					className="scenery"
					id="foreground1"
					ref={foreground1Movement.ref}
				>
					<img
						id="palm3"
						src={palm3_small}
						srcSet={`${palm3} 2x`}
						alt="palm3"
					/>
				</div>
				<div
					className="scenery"
					id="foreground2"
					ref={foreground2Movement.ref}
				>
					<img
						id="bush"
						src={bush_small}
						srcSet={`${bush} 2x`}
						alt="bush"
					/>
					<img
						id="w_rook_upright"
						src={w_rook_upright_small}
						srcSet={`${w_rook_upright} 2x`}
						alt="w_rook_upright"
					/>
				</div>
				<div
					className="scenery"
					id="background1"
					ref={background1Movement.ref}
				>
					<img
						id="r_pawn_upright"
						src={r_pawn_upright_small}
						srcSet={`${r_pawn_upright} 2x`}
						alt="r_pawn_upright"
					/>
					<img
						id="w_rook"
						src={w_rook_small}
						srcSet={`${w_rook} 2x`}
						alt="w_rook"
					/>
					<img
						id="palm1"
						src={palm1_small}
						srcSet={`${palm1} 2x`}
						alt="palm1"
					/>
				</div>
				<div
					className="scenery"
					id="background2"
					ref={background2Movement.ref}
				>
					<img
						id="r_pawn"
						src={r_pawn_small}
						srcSet={`${r_pawn} 2x`}
						alt="r_pawn"
					/>

					<img
						id="r_knight"
						src={r_knight_small}
						srcSet={`${r_knight} 2x`}
						alt="r_knight"
					/>
					<img
						id="palm2"
						src={palm2_small}
						srcSet={`${palm2} 2x`}
						alt="palm2"
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
