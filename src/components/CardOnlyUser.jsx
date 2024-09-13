import React from 'react';
import { ReactComponent as NoPriorityIcon } from '../icons/No-priority.svg';
import { ReactComponent as TodoIcon } from '../icons/To-do.svg';
import { ReactComponent as Backlog } from '../icons/Backlog.svg';
import { ReactComponent as DoneIcon } from '../icons/Done.svg';
import { ReactComponent as CancelledIcon } from '../icons/Cancelled.svg';
import { ReactComponent as InprogessIcon } from '../icons/in-progress.svg';
import { ReactComponent as NoPrioIcon } from '../icons/No-priority.svg';
import { ReactComponent as UrgentIcon } from '../icons/SVG - Urgent Priority grey.svg';
import { ReactComponent as HighPrioIcon } from '../icons/Img - High Priority.svg';
import { ReactComponent as MediumPrioIcon } from '../icons/Img - Medium Priority.svg';
import { ReactComponent as LowPrioIcon } from '../icons/Img - Low Priority.svg';



const CardOnlyUser = (props) => {
    // Inline styles
    const styles = {
        card: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            width: '340px',
            padding: '12px',
            margin: '10px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
            fontSize: '8px',
        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
        },
        cardId: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#A6A6A6',
        },
        cardImage: {
            width: '40px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            // Placeholder for an image
        },
        cardBody: {
            color: '#333',
        },
        cardTitle: {
            fontSize: '15px',
            margin: '0',
        },
        cardTags: {
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
        },
        tag: {
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '10px',
            // color: '#888',
            // backgroundColor: '#FAFAFA',

        },
        featureRequestTag: {
            border: '1px solid #ddd',
        },
    };

    let tobeIcon = "";
    if (props.sts === 'Backlog') {
        tobeIcon = Backlog;
    } else if (props.sts === 'Todo') {
        tobeIcon = TodoIcon;
    } else if (props.sts === 'In progress') {
        tobeIcon = InprogessIcon;
    } else if (props.sts === 'Done') {
        tobeIcon = DoneIcon;
    } else {
        tobeIcon = CancelledIcon;
    }




    let tobePrioIcon = "";
    if (props.prio == '0') {
        tobePrioIcon = NoPrioIcon;
    } else if (props.prio == '4') {
        tobePrioIcon = UrgentIcon;
    } else if (props.prio == '3') {
        tobePrioIcon = HighPrioIcon;
    } else if (props.prio == '2') {
        tobePrioIcon = MediumPrioIcon;
    } else {
        tobePrioIcon = LowPrioIcon;
    }

    return (
        <div style={styles.card}>
            <div style={styles.cardHeader}>
                <div style={styles.cardId}>{props.id}</div>

            </div>
            <div style={styles.cardBody}>
                <h2 style={styles.cardTitle}>  <span style={styles.tag}>{React.createElement(tobeIcon)}</span>{props.title}</h2>
                <div style={styles.cardTags}>
                    {/* <span style={styles.tag}>!</span> */}
                    <span style={styles.tag}>{React.createElement(tobePrioIcon)}</span>

                    <span style={{ ...styles.tag, ...styles.featureRequestTag }}>  <svg height="10" width="15">
                        <circle r="5" cx="5" cy="5" fill="#D0D0D0" />
                    </svg>{props.tag}</span>
                </div>
            </div>
        </div>
    );
};

export default CardOnlyUser;
