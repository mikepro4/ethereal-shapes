import moment from "moment";

export const checkUser = (user, history) => {
    if(!user) {
        history.push("/auth/login")
    }
	// const momentDuration = moment.duration(time, "seconds");
	// let durationZero = "";
	// if (momentDuration.seconds() < 10) {
	// 	durationZero = 0;
	// }

	// let finalTime;

	// if (momentDuration.hours() > 0) {
	// 	finalTime = `${momentDuration.hours()}:${momentDuration.minutes()}:${durationZero}${momentDuration.seconds()}`;
	// } else {
	// 	finalTime = `${momentDuration.minutes()}:${durationZero}${momentDuration.seconds()}`;
	// }
	// return finalTime;
};
