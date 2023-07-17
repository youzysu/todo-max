import { Text } from "@components/base/Text";
import { COLOR_VARIANTS } from "@constants/colors";

export const TimeStamp: React.FC<{ timeStamp: string }> = ({ timeStamp }) => {
  const calculateTimeDiff = (timeStamp: string) => {
    const now = new Date();
    const generatedAtDate = new Date(timeStamp);

    const diff = now.getTime() - generatedAtDate.getTime();
    const diffInMinutes = Math.floor(diff / 1000 / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const diffInMinutesText =
      diffInMinutes === 0 ? "방금" : `${diffInMinutes}분 전`;
    const diffInHoursText = `${diffInHours}시간 전`;
    const diffInDaysText = `${diffInDays}일 전`;

    if (diffInDays > 0) {
      return diffInDaysText;
    }
    if (diffInHours > 0) {
      return diffInHoursText;
    }
    return diffInMinutesText;
  };

  return (
    <Text typography="displayMedium12" css={{ color: COLOR_VARIANTS.textWeak }}>
      {calculateTimeDiff(timeStamp)}
    </Text>
  );
};
