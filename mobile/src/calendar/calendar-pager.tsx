import React, { Component, Ref, PureComponent } from 'react';
import moment, { Moment } from 'moment';
import { calendarStyles } from './styles';
import { View, TouchableOpacity, Animated, PanResponder, PanResponderInstance, LayoutChangeEvent, Easing, StyleSheet, TransformsStyle, ViewStyle, TranslateXTransform, PanResponderGestureState } from 'react-native';
import { StyledText } from '../override/styled-text';
import { CalendarPage, OnSelectedDayCallback } from './calendar-page';
import { WeekModel, DayModel, CalendarSelection, ReadOnlyIntervalsModel, CalendarPageModel } from '../reducers/calendar/calendar.model';

interface CalendarPagerDefaultProps {
    intervals?: ReadOnlyIntervalsModel;
    selection?: CalendarSelection;
    disableBefore?: DayModel;
}

interface CalendarPagerProps extends CalendarPagerDefaultProps {
    pages: CalendarPageModel[];
    onSelectedDay: OnSelectedDayCallback;
    onNextPage: () => void;
    onPrevPage: () => void;
}

interface CalendarPagerState {
    width: number;
    height: number;
    coordinates: Animated.ValueXY;
    canSwipe: boolean;
}

export class CalendarPager extends Component<CalendarPagerProps, CalendarPagerState> {
    public static defaultProps: CalendarPagerDefaultProps = {
        intervals: null,
        disableBefore: null
    };

    private panResponder: PanResponderInstance;

    constructor(props: CalendarPagerProps) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            coordinates: new Animated.ValueXY({ x: 0, y: 0 }),
            canSwipe: true
        };
    }

    public componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => this.state.canSwipe,
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: this.state.coordinates.x, dy: this.state.coordinates.y }
                ]
            ),
            onPanResponderGrant: (e, gesture) => {
                this.state.coordinates.extractOffset();
            },
            onPanResponderRelease: (e, gesture) => {
                if (this.rightToLeftSwipe(gesture)) {
                    this.setState({ canSwipe: false });
                    this.moveToNearestPage(-this.state.width, () => {
                        this.nextPage();
                    });
                } else if (this.leftToRightSwipe(gesture)) {
                    this.setState({ canSwipe: false });
                    this.moveToNearestPage(this.state.width, () => {
                        this.prevPage();
                    });
                }
            }
        });
    }

    public render() {
        const [
            translateXProperty,
            translateYProperty
        ] = this.state.coordinates.getTranslateTransform() as [{'translateX': Animated.Animated }, {'translateY': Animated.Animated }];

        const swipeableViewStyles = StyleSheet.flatten([
            calendarStyles.swipeableList,
            { transform: [translateXProperty as TranslateXTransform] },
            { left: -this.state.width }
        ]);

        return <View style={calendarStyles.pagerContainer} onLayout={this.onLayoutContainer}>
            <Animated.View
                {...this.panResponder.panHandlers}
                style={swipeableViewStyles}>
                {
                    this.props.pages.map(page =>
                        <CalendarPage
                            key={page.pageId}
                            selection={this.props.selection}
                            onSelectedDay={this.props.onSelectedDay}
                            pageDate={page.date}
                            weeks={page.weeks}
                            intervals={this.props.intervals}
                            disableBefore={this.props.disableBefore}
                            width={this.state.width}
                            height={this.state.height}
                        />
                    )
                }
            </Animated.View>
        </View>;
    }

    private rightToLeftSwipe(gesture: PanResponderGestureState): boolean {
        return gesture.dx < 0;
    }

    private leftToRightSwipe(gesture: PanResponderGestureState): boolean {
        return gesture.dx > 0;
    }

    private nextPage() {
        this.props.onNextPage();
    }

    private prevPage() {
        this.props.onPrevPage();
    }

    private moveToNearestPage(toValue: number, onMoveComplete: () => void) {
        Animated.timing(this.state.coordinates.x, {
            toValue: toValue,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => {
            onMoveComplete();
            this.state.coordinates.setValue({ x: 0, y: 0 });
            this.setState({ canSwipe: true });
        });
    }

    private onLayoutContainer = (e: LayoutChangeEvent) => {
        this.setState({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height
        });
    }
}